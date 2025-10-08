import Config from '../constants/config';
import type { Transaction } from '../types';

// Mock implementation of a Biometric service
class BiometricService {
  public async isBiometricAvailable(): Promise<boolean> {
    return true; // Assume biometrics are always available for simulation
  }

  public async verifyBiometric(): Promise<boolean> {
    console.log('Simulating biometric prompt...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Biometric verification successful.');
    return true; // Assume successful verification
  }
}

// Mock implementation of a transaction security service
class TransactionSecurity {
  private async checkDailyLimit(amount: number): Promise<{ valid: boolean; reason: string }> {
    // In a real app, you would fetch the user's daily total from a database.
    const todaysSpent = 50000; 
    if (todaysSpent + amount > Config.DAILY_SEND_LIMIT) {
      return { valid: false, reason: 'Daily transaction limit exceeded.' };
    }
    return { valid: true, reason: '' };
  }

  private async checkSuspiciousPattern(transaction: any): Promise<{ valid: boolean; reason: string }> {
    // Simulate a check for unusual activity
    if (transaction.amount > 500000 && new Date().getHours() < 6) {
        return { valid: false, reason: 'Unusual transaction pattern detected.' };
    }
    return { valid: true, reason: '' };
  }

  public async validateTransaction(transaction: any): Promise<void> {
    console.log('Validating transaction against security rules...');
    const validations = await Promise.all([
      this.checkDailyLimit(transaction.amount),
      this.checkSuspiciousPattern(transaction),
    ]);

    const failedValidations = validations.filter(v => !v.valid);

    if (failedValidations.length > 0) {
      const reasons = failedValidations.map(v => v.reason).join(' ');
      console.error('Transaction validation failed:', reasons);
      throw new Error(`Transaction blocked: ${reasons}`);
    }

    console.log('Transaction passed all security checks.');
  }
}

class SecurityService {
    biometrics = new BiometricService();
    transactions = new TransactionSecurity();
}

export const securityService = new SecurityService();
