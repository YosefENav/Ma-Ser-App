# Ma Ser App

A master donation application that monitors your bank account balance and prompts you to donate to charities when your balance exceeds user-defined thresholds.

## Features

- **Bank Account Linking**: Connect your bank account securely via Plaid
- **Custom Donation Rules**: Set balance thresholds and donation amounts
- **Smart Prompts**: Get notified when conditions are met
- **Multi-Charity Support**: Donate to major verified charities
- **Automated Processing**: Scheduled balance checks and donation routing

## Architecture

### Core Components

1. **Bank Connection (Plaid)**: Real-time balance monitoring
2. **Donation Rails**: Integration with donation platform APIs
3. **Rule Engine**: User-defined triggers and donation logic
4. **Scheduler**: Periodic balance checks and prompt generation

### Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Bank Integration**: Plaid API
- **Donation Processing**: Pledge API / Stripe

## Data Model

### User
- Authentication info
- Plaid access token (encrypted)
- Contact preferences

### AccountRule
- User ID
- Linked bank account ID
- Threshold amount
- Donation type (percent or fixed)
- Donation value
- Charity ID
- Frequency (daily/weekly/monthly)

### Charity
- ID from donation API
- Name, logo, categories

### Donation
- User ID, Charity ID
- Amount, status
- External donation ID

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run development server: `npm run dev`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
DONATION_API_KEY=your_donation_api_key
```

## Implementation Roadmap

- [x] Repository setup
- [ ] Supabase schema and migrations
- [ ] Plaid integration
- [ ] User authentication
- [ ] Rule management UI
- [ ] Charity search
- [ ] Balance checker scheduler
- [ ] Notification system
- [ ] Donation processing
- [ ] Dashboard and analytics

## Security Considerations

- Plaid access tokens are encrypted at rest
- All API keys stored as environment variables
- HTTPS/TLS for all external communications
- Rate limiting on API endpoints

## License

MIT
