export interface User {
  id: string;
  email: string;
  name: string;
  plaidAccessToken?: string; // Encrypted
  createdAt: Date;
}

export interface AccountRule {
  id: string;
  userId: string;
  accountId: string;
  thresholdAmount: number;
  donationType: 'percent' | 'fixed';
  donationValue: number; // 0.1 for 10%, or fixed amount like 50
  charityId: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  lastTriggeredAt?: Date;
  isActive: boolean;
}

export interface Charity {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  category: string;
  externalId: string; // From donation API
}

export interface Donation {
  id: string;
  userId: string;
  charityId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  externalDonationId?: string;
  createdAt: Date;
}

export interface Balance {
  accountId: string;
  available: number;
  current: number;
  isoCurrency: string;
}
