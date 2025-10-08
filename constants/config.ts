// In a real production app, these values would be populated from environment variables
// (e.g., using a .env file and a build process). For this simulation, we'll use constants.

const Config = {
  // API Endpoints
  API_BASE_URL: 'https://api.smartpay.rw/v1',
  
  // Payment Providers (using placeholder keys)
  MTN_API_KEY: 'mock-mtn-api-key',
  MTN_BASE_URL: 'https://api.mtn.com/momo',
  MTN_SUBSCRIPTION_KEY: 'mock-mtn-subscription-key',
  AIRTEL_API_KEY: 'mock-airtel-api-key',
  
  // Security
  ENCRYPTION_KEY: 'mock-super-secret-encryption-key',
  JWT_SECRET: 'mock-super-secret-jwt-secret',
  
  // Features Flags
  ENABLE_BIOMETRICS: true,
  ENABLE_CRYPTO: true,
  ENABLE_INVESTMENTS: true,
  
  // Transaction Limits (in RWF)
  DAILY_SEND_LIMIT: 5000000, 
  TRANSACTION_LIMIT: 1000000,
};

export default Config;
