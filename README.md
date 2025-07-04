# CRM System

This is a comprehensive CRM (Customer Relationship Management) system built with [Next.js](https://nextjs.org). The system helps manage leads, opportunities, service tickets, and inventory.

## Features

- User authentication and role-based access control
- Lead management
- Opportunity tracking
- Service ticket management
- Inventory management
- Dashboard with analytics
- And more...

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```
# API URL Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Authentication Configuration
NEXT_PUBLIC_AUTH_SECRET=your_auth_secret_key_here
NEXT_PUBLIC_JWT_EXPIRY=7d

# Application Configuration
NEXT_PUBLIC_APP_NAME=CRM System
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a custom font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
