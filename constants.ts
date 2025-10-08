import { Phone, Car, Home, Heart, ArrowUpRight, ArrowDownLeft, ShoppingCart, Power } from 'lucide-react';
import type { InsurancePolicy } from './types';

export const mockPolicies: InsurancePolicy[] = [
    { id: '1', type: 'Vehicle', name: 'Car Insurance', coverage: 'RAA123B - Comprehensive', premium: 15000, status: 'Active', icon: Car },
    { id: '2', type: 'Health', name: 'Family Health Plan', coverage: 'Gold Tier', premium: 25000, status: 'Active', icon: Heart },
    { id: '3', type: 'Property', name: 'Home Insurance', coverage: 'Kigali - KG 123 ST', premium: 18000, status: 'Expired', icon: Home },
];
