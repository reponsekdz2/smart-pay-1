
import type { User, Wallet, Transaction, SavingsGoal, InsurancePolicy } from '../types';

const MOCK_USERS: User[] = [
    {
        id: 'user_1',
        name: 'John Kagame',
        phone: '250788123456',
        nationalId: '1199081234567012',
        pin: '123456', // In a real app, this MUST be hashed
        createdAt: new Date().toISOString(),
    },
    {
        id: 'user_2',
        name: 'Alice Mukamana',
        phone: '250788654321',
        nationalId: '1199587654321023',
        pin: '654321',
        createdAt: new Date().toISOString(),
    },
     {
        id: 'user_admin',
        name: 'Admin User',
        phone: '250788000000',
        nationalId: '1198080000000000',
        pin: 'adminpin',
        isAdmin: true,
        createdAt: new Date().toISOString(),
    }
];

const MOCK_WALLETS: Wallet[] = [
    {
        id: 'wallet_1',
        userId: 'user_1',
        balance: 150000,
        availableBalance: 145000,
        currency: 'RWF',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'wallet_2',
        userId: 'user_2',
        balance: 75000,
        availableBalance: 75000,
        currency: 'RWF',
        createdAt: new Date().toISOString(),
    },
     {
        id: 'wallet_admin',
        userId: 'user_admin',
        balance: 10000000,
        availableBalance: 10000000,
        currency: 'RWF',
        createdAt: new Date().toISOString(),
    }
];

const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 'txn_1', fromWalletId: 'wallet_2', toWalletId: 'wallet_1', amount: 25000, fee: 100,
        currency: 'RWF', status: 'COMPLETED', type: 'P2P', description: 'Lunch money',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
     {
        id: 'txn_2', fromWalletId: 'EXTERNAL', toWalletId: 'wallet_1', amount: 50000, fee: 500,
        currency: 'RWF', status: 'COMPLETED', type: 'TOPUP', provider: 'MTN',
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    }
];

const MOCK_SAVINGS_GOALS: SavingsGoal[] = [
    {
        id: 'sg_1', userId: 'user_1', name: 'New Laptop', targetAmount: 800000, currentAmount: 350000,
        createdAt: new Date().toISOString(),
    }
];

const MOCK_INSURANCE_POLICIES: InsurancePolicy[] = [
    {
        id: 'ip_1', userId: 'user_1', provider: 'Radiant', type: 'Auto', policyNumber: 'RAD-123',
        coverage: 10000000, premium: 45000, status: 'Active',
        startDate: '2023-01-01', endDate: '2024-01-01',
    },
     {
        id: 'ip_2', userId: 'user_1', provider: 'Britam', type: 'Health', policyNumber: 'BRI-456',
        coverage: 5000000, premium: 20000, status: 'Active',
        startDate: '2023-06-01', endDate: '2024-06-01',
    }
];


export interface MOCK_USER_DB_TYPE {
    users: User[];
    wallets: Wallet[];
    transactions: Transaction[];
    savingsGoals: SavingsGoal[];
    insurancePolicies: InsurancePolicy[];
}

export const MOCK_DB: MOCK_USER_DB_TYPE = {
    users: MOCK_USERS,
    wallets: MOCK_WALLETS,
    transactions: MOCK_TRANSACTIONS,
    savingsGoals: MOCK_SAVINGS_GOALS,
    insurancePolicies: MOCK_INSURANCE_POLICIES,
};
