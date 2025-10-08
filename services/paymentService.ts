import Config from '../constants/config';
import type { PaymentRequest, PaymentResponse } from '../types';

// This is a mock implementation of an MTN Mobile Money service.
class MTNMobileMoneyService {
  private apiKey: string;
  private baseURL: string;
  private subscriptionKey: string;

  constructor() {
    this.apiKey = Config.MTN_API_KEY;
    this.baseURL = Config.MTN_BASE_URL;
    this.subscriptionKey = Config.MTN_SUBSCRIPTION_KEY;
  }

  // Simulates polling for the transaction status from the MTN API.
  private async pollTransactionStatus(referenceId: string): Promise<'SUCCESSFUL' | 'FAILED'> {
    console.log(`Polling status for transaction: ${referenceId}`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    // Randomly succeed or fail for demonstration purposes.
    const isSuccess = Math.random() > 0.1; // 90% success rate
    console.log(`Transaction ${referenceId} status: ${isSuccess ? 'SUCCESSFUL' : 'FAILED'}`);
    return isSuccess ? 'SUCCESSFUL' : 'FAILED';
  }

  public async initiatePayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    console.log(`Initiating MTN payment to ${paymentRequest.recipient} for ${paymentRequest.amount} RWF`);
    
    // Simulate API call to MTN
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const referenceId = `mtn-tx-${Date.now()}`;
    console.log(`MTN payment initiated. Reference ID: ${referenceId}`);

    const status = await this.pollTransactionStatus(referenceId);
    
    const fee = paymentRequest.amount * 0.005; // Simulate 0.5% fee

    if (status === 'SUCCESSFUL') {
        return {
            success: true,
            transactionId: referenceId,
            amount: paymentRequest.amount,
            fee: fee,
            status: 'SUCCESSFUL',
        };
    } else {
        return {
            success: false,
            transactionId: referenceId,
            amount: paymentRequest.amount,
            fee: 0,
            status: 'FAILED',
            message: 'The provider could not process the transaction.'
        };
    }
  }
}

// In a real app, you would have more service classes like this.
// class AirtelMoneyService { /* ... */ }
// class BankOfKigaliService { /* ... */ }

// The PaymentGateway abstracts away the specific payment provider.
class PaymentGateway {
  private providers: Map<string, any> = new Map();

  constructor() {
    // We only instantiate the MTN service for this simulation.
    this.providers.set('MTN', new MTNMobileMoneyService());
    this.providers.set('AIRTEL', new MTNMobileMoneyService()); // Use MTN as mock
    this.providers.set('BK', new MTNMobileMoneyService()); // Use MTN as mock
    this.providers.set('EQUITY', new MTNMobileMoneyService()); // Use MTN as mock
    this.providers.set('PAYPAL', new MTNMobileMoneyService()); // Use MTN as mock
    this.providers.set('STRIPE', new MTNMobileMoneyService()); // Use MTN as mock
  }

  public async processPayment(provider: string, request: PaymentRequest): Promise<PaymentResponse> {
    const paymentProvider = this.providers.get(provider);
    if (!paymentProvider) {
      throw new Error(`Unsupported provider: ${provider}`);
    }

    console.log(`Processing payment via gateway for provider: ${provider}`);
    
    const result = await paymentProvider.initiatePayment(request);

    if (!result.success) {
        throw new Error(result.message || 'Payment processing failed.');
    }

    // Here you would record the transaction in your own database.
    console.log('Transaction successful, recording to internal ledger...');
    
    return result;
  }
}

export const paymentGateway = new PaymentGateway();
