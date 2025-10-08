// --- Core Data Models ---

export interface User {
  id: string;
  name: string;
  phone: string;
  pin: string; // Hashed in a real system
  nationalId: string;
  createdAt: string;
  isAdmin: boolean;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: 'RWF';
}

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'FLAGGED';

export interface Transaction {
  id: string;
  fromWalletId: string;
  toWalletId: string;
  amount: number;
  fee: number;
  currency: 'RWF';
  description: string;
  status: TransactionStatus;
  createdAt: string;
}

export type InsuranceType = 'Health' | 'Auto' | 'Home' | 'Life';

export interface InsurancePolicy {
  id: string;
  userId: string;
  provider: string;
  type: InsuranceType;
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

// --- API & Service Payloads ---

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginDto {
  phone: string;
  pin: string;
}

export interface RegisterDto extends Omit<User, 'id' | 'createdAt' | 'isAdmin'> {}

export interface SendMoneyDto {
    fromUserId: string;
    toPhone: string;
    amount: number;
    description: string;
}

export interface PaymentProvider {
  id: string;
  name: string;
  type: 'momo' | 'bank' | 'card';
  logo: string;
}

export interface NotificationPayload {
    userId: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

export interface ComplianceCheck {
    passed: boolean;
    failedChecks: string[];
    riskScore: number;
    requiresManualReview: boolean;
}

// --- Developer & API Management ---

export type ApiPermission = 'transactions:create' | 'transactions:read' | 'users:read' | 'wallets:read';

export interface ApiKey {
  id: string;
  merchantName: string;
  apiKey: string;
  apiSecretHash: string; // Only the hash is stored
  permissions: ApiPermission[];
  createdAt: string;
  status: 'active' | 'revoked';
}

export interface GenerateApiKeyDto {
    merchantName: string;
    permissions: ApiPermission[];
}

// This is the response from the service, including the secret for one-time display
export interface GeneratedApiKey extends ApiKey {
    apiSecret: string; // The raw secret, shown only once
}

export interface ApiEndpoint {
    method: 'GET' | 'POST';
    path: string;
    description: string;
    permissions: ApiPermission[];
}


// --- Analytics & BI ---

export interface BusinessIntelligence {
  dailyTransactionVolume: number;
  newUserSignups: number;
  totalRevenue: number;
  highRiskTransactions: number;
}

export interface SpendingCategory {
    category: string;
    amount: number;
}

export interface IncomeExpenseData {
    month: string;
    income: number;
    expense: number;
}

export interface FinancialInsights {
    spendingByCategory: SpendingCategory[];
    incomeVsExpense: IncomeExpenseData[];
    savingsRate: number; // as a percentage
}