import type { RegisterData, AuthResponse, User } from '../types';

// This is a mock database of users. In a real app, this would be a secure backend database.
const MOCK_USER_DB: { [phone: string]: User } = {};

class AuthService {
  // Simulate checking KYC with a national database.
  private async verifyKYC(data: RegisterData): Promise<{ verified: boolean }> {
    console.log(`Verifying KYC for ${data.name} with ID ${data.nationalId}...`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    if (data.nationalId.length === 16 && data.name.trim() !== '') {
        console.log('KYC Verified.');
        return { verified: true };
    }
    console.log('KYC Failed.');
    return { verified: false };
  }

  // Simulate creating a user account in the database.
  private async createUserAccount(data: RegisterData): Promise<User> {
    console.log(`Creating account for ${data.phone}...`);
    const newUser: User = {
        id: `user-${Date.now()}`,
        phone: data.phone,
        name: data.name,
        pin: data.pin,
        balance: 500000, // Starting balance
        transactions: [],
        bio: 'Digital finance enthusiast | Making payments simpler in Rwanda.',
        connections: 0,
        trustScore: '75%',
        email: `${data.name.split(' ')[0].toLowerCase()}@smartpay.rw`,
        verified: true,
    };
    MOCK_USER_DB[data.phone] = newUser;
    console.log('Account created:', newUser);
    return newUser;
  }

  public async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      if (MOCK_USER_DB[userData.phone]) {
        throw new Error('User with this phone number already exists.');
      }

      const kycResult = await this.verifyKYC(userData);
      if (!kycResult.verified) throw new Error('KYC verification failed. Please check your details.');

      const user = await this.createUserAccount(userData);
      
      // In a real app, you would generate and return JWTs.
      const tokens = { accessToken: `mock-access-${user.id}`, refreshToken: `mock-refresh-${user.id}` };
      
      return { success: true, user, tokens };
    } catch (error: any) {
      console.error('Registration Service Error:', error.message);
      throw error; // Re-throw to be caught by the caller
    }
  }

  public async login(phone: string, pin: string): Promise<AuthResponse> {
    console.log(`Attempting login for ${phone}...`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    const user = MOCK_USER_DB[phone];

    if (user && user.pin === pin) {
        console.log('Login successful for:', user.name);
        const tokens = { accessToken: `mock-access-${user.id}`, refreshToken: `mock-refresh-${user.id}` };
        return { success: true, user, tokens };
    } else {
        console.log('Login failed: Invalid credentials.');
        throw new Error('Invalid phone number or PIN.');
    }
  }

  // Simulate authenticating a payment with biometrics, PIN, or OTP.
  public async processPaymentAuth(amount: number, transactionType: string): Promise<boolean> {
    console.log(`Processing payment auth for ${amount} RWF (${transactionType})...`);
    // This simulates a successful high-security check (e.g., biometrics or correct PIN entry).
    // In a real app, this would trigger a UI prompt for biometrics/PIN.
    await new Promise(resolve => setTimeout(resolve, 500)); 
    console.log('Payment auth successful.');
    return true;
  }
}

export const authService = new AuthService();
