
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    id: string;
    phone: string;
    name: string;
    pin: string; // Hashed in a real app
    nationalId: string;
    kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
    role: 'USER' | 'AGENT' | 'MERCHANT' | 'ADMIN';
    permissions: string[];
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

export type TransactionType = 'P2P' | 'TOPUP' | 'WITHDRAWAL' | 'BILL_PAYMENT' | 'MERCHANT_PAYMENT' | 'SAVINGS' | 'INSURANCE';

export interface Transaction {
    id: string;
    fromWalletId: string; // 'EXTERNAL' for top-ups
    toWalletId: string;   // 'EXTERNAL' for withdrawals
    amount: number;
    fee: number;
    currency: 'RWF';
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'FLAGGED' | 'CANCELLED';
    type: TransactionType;
    provider?: string; // e.g., 'MTN', 'Airtel'
    providerReference?: string;
    description: string;
    createdAt: string;
}

export interface LoginDto {
    phone: string;
    pin: string;
}

export interface RegisterDto {
    phone: string;
    pin: string;
    name: string;
    nationalId: string;
}

export interface PaymentDto {
    fromUserId: string;
    toPhone: string;
    amount: number;
    description?: string;
    pin: string;
    provider?: string; // for topups
}

export interface ZeroTrustContext {
    userId: string;
    deviceId: string;
    ipAddress: string;
    operation: 'LOGIN' | 'HIGH_VALUE_TRANSFER';
}

export interface ZeroTrustResult {
    allowed: boolean;
    riskScore: number;
    requiresStepUp: boolean; // e.g., requires OTP or biometric
}

export interface PaymentRoute {
    provider: string;
    cost: number;
    speed: number; // in seconds
    reliability: number; // 0-1
    successRate: number; // 0-1
}

export interface BusinessIntelligence {
    timestamp: string;
    dailyTransactionVolume: number;
    newUserSignups: number;
    totalRevenue: number;
    highRiskTransactions: number;
}

export interface FinancialInsights {
    spendingByCategory: { category: string; amount: number }[];
    incomeVsExpense: { month: string; income: number; expense: number }[];
    savingsRate: number; // percentage
}

export interface NotificationPayload {
    userId: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

export interface RelationshipNode {
    contactId: string;
    contactName: string;
    transactionCount: number;
    totalSent: number;
    totalReceived: number;
    strength: number; // 0-1 score
}

export interface FinancialHealthPrediction {
    score: number; // 0-100
    trend: 'improving' | 'stable' | 'declining';
    recommendations: string[];
}

export interface FraudAnalysis {
    isFraud: boolean;
    riskScore: number; // 0-1
    confidence: number; // 0-1
    recommendedAction: 'ALLOW' | 'CHALLENGE' | 'BLOCK';
}

export interface ComplianceCheck {
    passed: boolean;
    failedChecks: string[];
    riskScore: number;
    requiresManualReview: boolean;
}

export interface SavingsGoal {
    id: string;
    userId: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    createdAt: string;
}

export interface InsurancePolicy {
    id: string;
    userId: string;
    provider: string;
    type: 'Health' | 'Life' | 'Auto' | 'Home';
    premium: number;
    coverage: number;
    status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
    startDate: string;
    endDate: string;
}

export interface CryptoAsset {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number; // percentage
}

export interface CryptoHolding {
    assetId: string;
    amount: number;
    valueInRwf: number;
}
