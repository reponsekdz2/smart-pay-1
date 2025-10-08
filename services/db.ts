import type { User, Wallet, Transaction, InsurancePolicy, SavingsGoal } from '../types.ts';
import { MOCK_INSURANCE_POLICIES } from '../constants/insuranceData.ts';

// Mock data
const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Jean Luc', phone: '250788123456', pin: '123456', nationalId: '1199081234567012', createdAt: new Date().toISOString(), isAdmin: false },
    { id: 'user-2', name: 'Marie Claire', phone: '250788654321', pin: '654321', nationalId: '1199571234567013', createdAt: new Date().toISOString(), isAdmin: false },
    { id: 'admin-1', name: 'Admin User', phone: '250788000000', pin: 'adminpin', nationalId: '1198081234567000', createdAt: new Date().toISOString(), isAdmin: true },
];

const MOCK_WALLETS: Wallet[] = [
    { id: 'wallet-user-1', userId: 'user-1', balance: 500000, currency: 'RWF' },
    { id: 'wallet-user-2', userId: 'user-2', balance: 125000, currency: 'RWF' },
    { id: 'wallet-admin-1', userId: 'admin-1', balance: 10000000, currency: 'RWF' },
];

const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'tx-1', fromWalletId: 'wallet-user-1', toWalletId: 'wallet-user-2', amount: 25000, fee: 100, currency: 'RWF', description: 'Lunch payment', status: 'COMPLETED', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'tx-2', fromWalletId: 'wallet-user-2', toWalletId: 'wallet-user-1', amount: 10000, fee: 100, currency: 'RWF', description: 'Coffee', status: 'COMPLETED', createdAt: new Date().toISOString() },
    { id: 'tx-3', fromWalletId: 'wallet-user-1', toWalletId: 'wallet-user-2', amount: 600000, fee: 500, currency: 'RWF', description: 'Rent', status: 'FLAGGED', createdAt: new Date().toISOString() },
];

const MOCK_SAVINGS_GOALS: SavingsGoal[] = [
    { id: 'goal-1', userId: 'user-1', name: 'New Laptop', targetAmount: 1500000, currentAmount: 800000, createdAt: new Date().toISOString() },
    { id: 'goal-2', userId: 'user-1', name: 'Vacation', targetAmount: 1000000, currentAmount: 250000, createdAt: new Date().toISOString() },
];

const MOCK_INSURANCE_POLICIES_WITH_ID: InsurancePolicy[] = MOCK_INSURANCE_POLICIES.map((policy, i) => ({
    ...policy,
    id: `policy-${i+1}`,
    userId: 'user-1'
}));

export const MOCK_DB = {
    users: MOCK_USERS,
    wallets: MOCK_WALLETS,
    transactions: MOCK_TRANSACTIONS,
    savingsGoals: MOCK_SAVINGS_GOALS,
    insurancePolicies: MOCK_INSURANCE_POLICIES_WITH_ID,
};

export type MOCK_USER_DB_TYPE = typeof MOCK_DB;
