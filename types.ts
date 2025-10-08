
export interface User {
    id: string;
    phone: string;
    name: string;
    nationalId: string;
    pin: string; // Hashed in a real app
    isAdmin?: boolean;
    createdAt: string;
}

export interface Wallet {
    id: string;
    userId: string;
    balance: number;
    availableBalance: number;
    currency: 'RWF';
    createdAt: string;
}

export interface Transaction {
    id: string;
    fromWalletId: string;
    toWalletId: string;
    amount: number;
    fee: number;
    currency: 'RWF';
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'FLAGGED';
    type: 'P2P' | 'TOPUP' | 'PAYMENT' | 'WITHDRAWAL';
    description?: string;
    provider?: string;
    providerReference?: string;
    createdAt: string;
}

export interface SavingsGoal {
    id: string;
    userId: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline?: string;
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

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

// Data Transfer Objects (DTOs)
export type LoginDto = Pick<User, 'phone' | 'pin'>;
export type RegisterDto = Pick<User, 'phone' | 'pin' | 'name' | 'nationalId'>;

export interface PaymentDto {
    fromUserId?: string;
    toPhone?: string;
    amount: number;
    description?: string;
    pin?: string;
    provider?: string; // For top-ups, etc.
}

export interface RelationshipNode {
    contactId: string;
    contactName: string;
    transactionCount: number;
    totalSent: number;
    totalReceived: number;
    strength: number; // 0 to 1
}

export interface FinancialInsights {
    spendingByCategory: { category: string; amount: number }[];
    incomeVsExpense: { month: string; income: number; expense: number }[];
    savingsRate: number;
}

export interface BusinessIntelligence {
    dailyTransactionVolume: number;
    newUserSignups: number;
    totalRevenue: number;
    highRiskTransactions: number;
}

export interface FinancialHealthPrediction {
    score: number; // 0-100
    trend: 'improving' | 'stable' | 'declining';
    recommendations: string[];
}

export interface FraudAnalysis {
    isFraud: boolean;
    riskScore: number; // 0-1
    confidence: number;
    recommendedAction: 'ALLOW' | 'CHALLENGE' | 'BLOCK';
}

export interface ComplianceCheck {
    passed: boolean;
    failedChecks: string[];
    riskScore: number;
    requiresManualReview: boolean;
}

export interface PaymentRoute {
    provider: string;
    cost: number;
    speed: number;
    reliability: number;

}
export interface NotificationPayload {
    userId: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

export interface PaymentProvider {
    id: string;
    name: string;
    type: 'momo' | 'bank' | 'card';
    logo: string;
}
