import { NextRequest, NextResponse } from 'next/server';
import { AccountRule } from '@/types';
import crypto from 'crypto';

/**
 * Create a new donation rule
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Get userId from auth session
    const userId = body.userId || 'temp-user-id';

    const rule: AccountRule = {
      id: crypto.randomUUID(),
      userId,
      accountId: body.accountId,
      thresholdAmount: parseFloat(body.thresholdAmount),
      donationType: body.donationType,
      donationValue: parseFloat(body.donationValue),
      charityId: body.charityId,
      frequency: body.frequency,
      isActive: true,
    };

    // Validate rule
    if (rule.thresholdAmount <= 0) {
      return NextResponse.json(
        { error: 'Threshold must be positive' },
        { status: 400 }
      );
    }

    if (rule.donationType === 'percent' && (rule.donationValue <= 0 || rule.donationValue > 1)) {
      return NextResponse.json(
        { error: 'Percent must be between 0 and 1' },
        { status: 400 }
      );
    }

    // TODO: Save rule to database
    // await saveRule(rule);

    return NextResponse.json({ success: true, rule });
  } catch (error) {
    console.error('Error creating rule:', error);
    return NextResponse.json(
      { error: 'Failed to create rule' },
      { status: 500 }
    );
  }
}

/**
 * Get all rules for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from auth session
    const userId = 'temp-user-id';

    // TODO: Fetch rules from database
    // const rules = await getRulesByUser(userId);
    const rules: AccountRule[] = [];

    return NextResponse.json({ rules });
  } catch (error) {
    console.error('Error fetching rules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rules' },
      { status: 500 }
    );
  }
}
