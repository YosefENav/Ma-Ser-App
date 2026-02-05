import { AccountRule, Balance } from '../types';
import { getPrimaryAccountBalance } from './balance';

interface DonationPrompt {
  userId: string;
  ruleId: string;
  charityId: string;
  suggestedAmount: number;
  balance: number;
}

/**
 * Evaluate a single rule against current balance
 */
export function evaluateRule(rule: AccountRule, balance: Balance): number | null {
  if (balance.available < rule.thresholdAmount) {
    return null; // Threshold not met
  }

  const overage = balance.available - rule.thresholdAmount;
  
  if (rule.donationType === 'percent') {
    return overage * rule.donationValue;
  } else {
    return rule.donationValue;
  }
}

/**
 * Check if rule is due for evaluation based on frequency
 */
export function isRuleDue(rule: AccountRule): boolean {
  if (!rule.lastTriggeredAt) return true;

  const now = new Date();
  const lastTriggered = new Date(rule.lastTriggeredAt);
  const hoursSince = (now.getTime() - lastTriggered.getTime()) / (1000 * 60 * 60);

  switch (rule.frequency) {
    case 'daily':
      return hoursSince >= 24;
    case 'weekly':
      return hoursSince >= 168; // 7 days
    case 'monthly':
      return hoursSince >= 720; // 30 days
    default:
      return false;
  }
}

/**
 * Main scheduler job function (would be called by cron)
 */
export async function evaluateRulesJob(
  getDueRules: () => Promise<AccountRule[]>,
  getAccessToken: (userId: string) => Promise<string>,
  sendDonationPrompt: (prompt: DonationPrompt) => Promise<void>,
  markRuleEvaluated: (ruleId: string) => Promise<void>
): Promise<void> {
  const rules = await getDueRules();

  for (const rule of rules) {
    try {
      if (!rule.isActive || !isRuleDue(rule)) continue;

      const accessToken = await getAccessToken(rule.userId);
      const balance = await getPrimaryAccountBalance(accessToken);
      const donationAmount = evaluateRule(rule, balance);

      if (donationAmount && donationAmount > 0) {
        await sendDonationPrompt({
          userId: rule.userId,
          ruleId: rule.id,
          charityId: rule.charityId,
          suggestedAmount: donationAmount,
          balance: balance.available,
        });

        await markRuleEvaluated(rule.id);
      }
    } catch (error) {
      console.error(`Error evaluating rule ${rule.id}:`, error);
    }
  }
}
