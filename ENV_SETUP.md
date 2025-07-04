# Environment Variables Setup Guide

## Overview

This document provides information about the environment variables used in this CRM system and how to set them up correctly.

## Environment Variables

The application uses the following environment variables:

### API Configuration

- `NEXT_PUBLIC_API_URL`: The base URL for the API server. Default is `http://localhost:3000/api`.

### Authentication Configuration

- `NEXT_PUBLIC_AUTH_SECRET`: Secret key used for JWT token generation and validation.
- `NEXT_PUBLIC_JWT_EXPIRY`: JWT token expiry time. Default is `7d` (7 days).

### Application Configuration

- `NEXT_PUBLIC_APP_NAME`: The name of the application. Default is `CRM System`.
- `NEXT_PUBLIC_APP_VERSION`: The version of the application. Default is `1.0.0`.

## Setup Instructions

1. Create a `.env` file in the root directory of the project.
2. Copy the contents from `.env.example` to your `.env` file.
3. Update the values as needed for your environment.

### Example .env File

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

## Testing Your Configuration

After setting up your environment variables, you can test the API connection by running:

```bash
npm run test-api
```

This will attempt to connect to the API server using the URL specified in your `.env` file.

## Troubleshooting

If you encounter issues with your environment variables:

1. Make sure the `.env` file is in the root directory of the project.
2. Verify that the variable names match exactly as specified above.
3. Restart the development server after making changes to the `.env` file.
4. Check that the API server is running at the URL specified in `NEXT_PUBLIC_API_URL`.

## Notes

- Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Be careful not to include sensitive information in these variables.
- The `.env` file should not be committed to version control. It is already added to `.gitignore`.
- For production deployment, set these environment variables in your hosting platform's configuration.