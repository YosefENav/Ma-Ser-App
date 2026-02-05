import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaidClient';

/**
 * Exchange Plaid public token for access token
 */
export async function POST(request: NextRequest) {
  try {
    const { public_token, userId } = await request.json();

    if (!public_token) {
      return NextResponse.json(
        { error: 'public_token is required' },
        { status: 400 }
      );
    }

    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = tokenResponse.data.access_token;

    // TODO: Encrypt and store accessToken for userId in database
    // await savePlaidAccessToken(userId, accessToken);

    return NextResponse.json({
      success: true,
      message: 'Bank account linked successfully',
    });
  } catch (error) {
    console.error('Error exchanging token:', error);
    return NextResponse.json(
      { error: 'Failed to link bank account' },
      { status: 500 }
    );
  }
}
