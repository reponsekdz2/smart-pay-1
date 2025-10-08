import { Phone, Car, Home, Heart, ArrowUpRight, ArrowDownLeft, ShoppingCart, Power } from 'lucide-react';
import type { Transaction, InsurancePolicy, InvestmentGoal } from './types';

export const mockPolicies: InsurancePolicy[] = [
    { id: '1', type: 'Vehicle', name: 'Car Insurance', coverage: 'RAA123B - Comprehensive', premium: 15000, status: 'Active', icon: Car },
    { id: '2', type: 'Health', name: 'Family Health Plan', coverage: 'Gold Tier', premium: 25000, status: 'Active', icon: Heart },
    { id: '3', type: 'Property', name: 'Home Insurance', coverage: 'Kigali - KG 123 ST', premium: 18000, status: 'Expired', icon: Home },
];

export const mockInvestmentGoals: InvestmentGoal[] = [
    { id: '1', name: 'New Car', targetAmount: 5000000, currentAmount: 1250000, color: '#00A859' },
    { id: '2', name: 'Education Fund', targetAmount: 10000000, currentAmount: 6000000, color: '#FFC72C' },
    { id: '3', name: 'Emergency Fund', targetAmount: 2000000, currentAmount: 1800000, color: '#005C29' },
];

export const investmentPortfolioData = [
    { name: 'Rwandan Stocks', value: 400000, fill: '#00A859' },
    { name: 'Government Bonds', value: 300000, fill: '#005C29' },
    { name: 'East African Equities', value: 200000, fill: '#FFC72C' },
    { name: 'Cash Savings', value: 100000, fill: '#9CA3AF' },
];