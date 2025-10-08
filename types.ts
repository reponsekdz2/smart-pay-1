import { LucideIcon } from 'lucide-react';

export type TransactionIconType = 'arrow-up-right' | 'arrow-down-left' | 'shopping-cart' | 'power';

export interface Transaction {
    id: string;
    type: 'sent' | 'received' | 'payment' | 'top-up' | 'loan' | 'insurance';
    name: string;
    description: string;
    amount: number;
    date: string;
    iconName: TransactionIconType;
}

export interface InsurancePolicy {
    id: string;
    type: 'Account' | 'Vehicle' | 'Property' | 'Health';
    name: string;
    coverage: string;
    premium: number;
    status: 'Active' | 'Expired';
    icon: LucideIcon;
}

export interface InvestmentGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    color: string;
}

export interface NavItem {
    path: string;
    icon: LucideIcon;
    label: string;
}

// New types for Payment Integration
export type ProviderCategory = 'MOBILE_MONEY' | 'BANKS' | 'INTERNATIONAL';

export interface PaymentProvider {
    id: string;
    name: string;
    icon: LucideIcon;
    category: ProviderCategory;
    fees: string;
    speed: string;
    currency?: string;
    formFields: { 
        id: string; 
        label: string; 
        type: 'text' | 'number' | 'tel'; 
        placeholder: string; 
    }[];
}