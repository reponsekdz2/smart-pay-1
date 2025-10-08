import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Transaction } from '../types';

interface User {
    name: string;
    phone: string;
    pin: string;
    balance: number;
    transactions: Transaction[];
    // New fields for enhanced profile
    bio: string;
    connections: number;
    trustScore: string;
    email: string;
    verified: boolean;
}

interface UserStore {
    isAuthenticated: boolean;
    user: User;
    setPhone: (phone: string) => void;
    setName: (name: string) => void;
    setPin: (pin: string) => void;
    completeOnboarding: () => void;
    addTransaction: (details: { recipient: string; amount: number }) => void;
    topUpBalance: (amount: number, providerName: string) => void;
    logout: () => void;
}

const initialUser: User = {
    name: '',
    phone: '',
    pin: '',
    balance: 500000,
    transactions: [
        {
            id: '1',
            type: 'received',
            name: 'From Mum',
            description: 'Pocket money',
            amount: 25000,
            date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            iconName: 'arrow-down-left',
        },
        {
            id: '2',
            type: 'payment',
            name: 'MTN Airtime',
            description: 'Mobile top-up',
            amount: -5000,
            date: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
            iconName: 'power',
        },
        {
            id: '3',
            type: 'payment',
            name: 'Supermarket',
            description: 'Groceries',
            amount: -15750,
            date: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
            iconName: 'shopping-cart',
        },
    ],
    // New fields data
    bio: 'Digital finance enthusiast | Making payments simpler in Rwanda.',
    connections: 42,
    trustScore: '92%',
    email: 'user@smartpay.rw',
    verified: true,
};

const storeName = 'user-storage-v2';

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: initialUser,
            setPhone: (phone) => set((state) => ({ user: { ...state.user, phone, email: `user${phone.slice(-4)}@smartpay.rw` } })),
            setName: (name) => set((state) => ({ user: { ...state.user, name } })),
            setPin: (pin) => set((state) => ({ user: { ...state.user, pin } })),
            completeOnboarding: () => set({ isAuthenticated: true }),
            addTransaction: ({ recipient, amount }) => {
                const newTransaction: Transaction = {
                    id: new Date().toISOString(),
                    type: 'sent',
                    name: `To ${recipient}`,
                    description: 'Money Transfer',
                    amount: -amount,
                    date: new Date().toISOString(),
                    iconName: 'arrow-up-right',
                };
                set((state) => ({
                    user: {
                        ...state.user,
                        balance: state.user.balance - amount,
                        transactions: [newTransaction, ...state.user.transactions],
                    },
                }));
            },
            topUpBalance: (amount, providerName) => {
              const newTransaction: Transaction = {
                id: new Date().toISOString(),
                type: 'top-up',
                name: `Top-up via ${providerName}`,
                description: 'Added funds to wallet',
                amount: amount,
                date: new Date().toISOString(),
                iconName: 'arrow-down-left',
              };
              set((state) => ({
                user: {
                  ...state.user,
                  balance: state.user.balance + amount,
                  transactions: [newTransaction, ...state.user.transactions],
                },
              }));
            },
            logout: () => set({ isAuthenticated: false, user: initialUser }),
        }),
        {
            name: storeName,
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
              isAuthenticated: state.isAuthenticated,
              user: state.user,
            }),
        }
    )
);