
import type { User, Wallet, Transaction, SavingsGoal, InsurancePolicy } from '../types';

const MOCK_USERS: User[] = [
    {
        id: 'user_1', phone: '250788123456', name: 'John Kagame', pin: '123456', nationalId: '1199081234567012',
        kycStatus: 'VERIFIED', role: 'USER', permissions: ['read:self', 'write:self'], createdAt: new Date().toISOString()
    },
    {
        id: 'user_2', phone: '250788654321', name: 'Jane Mutoni', pin: '654321', nationalId: '1199587654321012',
        kycStatus: 'VERIFIED', role: 'USER', permissions: ['read:self', 'write:self'], createdAt: new Date().toISOString()
    },
     {
        id: 'admin_1', phone: '250788000000', name: 'Admin Supervisor', pin: '000000', nationalId: '1198080000000000',
        kycStatus: 'VERIFIED', role: 'ADMIN', permissions: ['*'], createdAt: new Date().toISOString()
    }
];

const MOCK_WALLETS: Wallet[] = [
    { id: 'wallet_1', userId: 'user_1', balance: 500000, availableBalance: 500000, currency: 'RWF', createdAt: new Date().toISOString() },
    { id: 'wallet_2', userId: 'user_2', balance: 125000, availableBalance: 125000, currency: 'RWF', createdAt: new Date().toISOString() },
    { id: 'admin_wallet_1', userId: 'admin_1', balance: 9999999, availableBalance: 9999999, currency: 'RWF', createdAt: new Date().toISOString() },
];

const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'txn_1', fromWalletId: 'wallet_2', toWalletId: 'wallet_1', amount: 25000, fee: 100, currency: 'RWF', status: 'COMPLETED', type: 'P2P', description: 'Lunch money', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'txn_2', fromWalletId: 'EXTERNAL', toWalletId: 'wallet_1', amount: 100000, fee: 0, currency: 'RWF', status: 'COMPLETED', type: 'TOPUP', provider: 'MTN', description: 'MTN Top-up', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'txn_3', fromWalletId: 'wallet_1', toWalletId: 'EXTERNAL', amount: 50000, fee: 500, currency: 'RWF', status: 'COMPLETED', type: 'BILL_PAYMENT', description: 'Electricity Bill', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
];

const MOCK_SAVINGS_GOALS: SavingsGoal[] = [
    { id: 'sg_1', userId: 'user_1', name: 'New Laptop', targetAmount: 1200000, currentAmount: 450000, deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), createdAt: new Date().toISOString() }
];

const MOCK_INSURANCE_POLICIES: InsurancePolicy[] = [
    { id: 'ip_1', userId: 'user_1', provider: 'Radiant', type: 'Health', premium: 15000, coverage: 1000000, status: 'ACTIVE', startDate: new Date().toISOString(), endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() }
];


// This simulates a simple in-memory database.
// In a real frontend app, this data would come from an API.
export const MOCK_DB = {
    users: MOCK_USERS,
    wallets: MOCK_WALLETS,
    transactions: MOCK_TRANSACTIONS,
    savingsGoals: MOCK_SAVINGS_GOALS,
    insurancePolicies: MOCK_INSURANCE_POLICIES,
};

export type MOCK_USER_DB_TYPE = typeof MOCK_DB;
