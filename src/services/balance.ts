import { plaidClient } from '../lib/plaidClient';
import { Balance } from '../types';

/**
 * Fetch the primary account balance for a user
 */
export async function getPrimaryAccountBalance(accessToken: string): Promise<Balance> {
  try {
    const response = await plaidClient.accountsBalanceGet({
      access_token: accessToken,
    });

    // Get first checking account or default to first account
    const primary = response.data.accounts.find(acc => acc.subtype === 'checking') 
      || response.data.accounts[0];

    if (!primary) {
      throw new Error('No accounts found');
    }

    return {
      accountId: primary.account_id,
      available: primary.balances.available || 0,
      current: primary.balances.current || 0,
      isoCurrency: primary.balances.iso_currency_code || 'USD',
    };
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}
