export interface User {
    id: string;
    name: string;
    phone: string;
    pin: string; // Hashed in a real app
    nationalId: string;
    createdAt: string;
    isAdmin?: boolean;
}

export interface Wallet {
    id: string;
    userId: string;
    balance: number;
    currency: 'RWF';
}

export interface Transaction {
    id: string;
    fromWalletId: string;
    toWalletId: string;
    amount: number;
    fee: number;
    currency: 'RWF';
    description: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'FLAGGED';
    createdAt: string;
}

export interface InsurancePolicy {
    id: string;
    userId: string;
    provider: string;
    type: 'Health' | 'Auto' | 'Home' | 'Life';
    policyNumber: string;
    coverage: number;
    premium: number;
    status: 'Active' | 'Expired' | 'Cancelled';
    startDate: string;
    endDate: string;
}

export interface SavingsGoal {
    id: string;
    userId: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    createdAt: string;
}

export interface PaymentProvider {
    id: string;
    name: string;
    type: 'momo' | 'bank' | 'card';
    logo: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export type RegisterDto = Omit<User, 'id' | 'createdAt'>;
export type LoginDto = Pick<User, 'phone' | 'pin'>;

export interface BusinessIntelligence {
    dailyTransactionVolume: number;
    newUserSignups: number;
    totalRevenue: number;
    highRiskTransactions: number;
}

export interface FinancialInsights {
    spendingByCategory: { category: string; amount: number }[];
    incomeVsExpense: { month: string; income: number; expense: number }[];
    savingsRate: number;
}

export interface ComplianceCheck {
    passed: boolean;
    failedChecks: string[];
    riskScore: number;
    requiresManualReview: boolean;
}

export interface NotificationPayload {
    userId: string;
    message: string;
    type: 'success' | 'error' | 'info';
}
