import { Smartphone, Landmark, Globe, Banknote, CreditCard, Star } from 'lucide-react';
import type { PaymentProvider } from '../types';

export const paymentProviders: PaymentProvider[] = [
    // Mobile Money Providers
    {
        id: 'MTN',
        name: 'MTN Mobile Money',
        icon: Smartphone,
        category: 'MOBILE_MONEY',
        fees: '0.5%',
        speed: 'Instant',
        formFields: [
            { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '078...' },
        ],
    },
    {
        id: 'AIRTEL',
        name: 'Airtel Money',
        icon: Smartphone,
        category: 'MOBILE_MONEY',
        fees: '0.5%',
        speed: 'Instant',
        formFields: [
            { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '073...' },
        ],
    },

    // Local Banks Integration
    {
        id: 'BK',
        name: 'Bank of Kigali',
        icon: Landmark,
        category: 'BANKS',
        fees: '100 RWF',
        speed: '1-2 hours',
        formFields: [
            { id: 'accountNumber', label: 'Account Number', type: 'text', placeholder: '00040-...' },
            { id: 'accountName', label: 'Account Holder Name', type: 'text', placeholder: 'John Kagame' },
        ],
    },
    {
        id: 'EQUITY',
        name: 'Equity Bank',
        icon: Landmark,
        category: 'BANKS',
        fees: '100 RWF',
        speed: '1-2 hours',
        formFields: [
             { id: 'accountNumber', label: 'Account Number', type: 'text', placeholder: '101...' },
             { id: 'accountName', label: 'Account Holder Name', type: 'text', placeholder: 'John Kagame' },
        ],
    },

    // International Payment Gateways
    {
        id: 'PAYPAL',
        name: 'PayPal',
        icon: Star,
        category: 'INTERNATIONAL',
        fees: '2.9% + $0.30',
        speed: '2-5 days',
        currency: 'USD',
        formFields: [
            { id: 'email', label: 'PayPal Email', type: 'text', placeholder: 'user@example.com' },
        ],
    },
    {
        id: 'STRIPE',
        name: 'Visa/Mastercard',
        icon: CreditCard,
        category: 'INTERNATIONAL',
        fees: '3.5%',
        speed: 'Instant',
        currency: 'Multi',
        formFields: [
            { id: 'cardNumber', label: 'Card Number', type: 'tel', placeholder: '•••• •••• •••• ••••' },
            { id: 'expiry', label: 'Expiry Date (MM/YY)', type: 'text', placeholder: 'MM/YY' },
            { id: 'cvc', label: 'CVC', type: 'tel', placeholder: '123' },
        ],
    },
];

export const providerCategories = {
    MOBILE_MONEY: { title: 'Mobile Money', icon: Smartphone },
    BANKS: { title: 'Local Banks', icon: Landmark },
    INTERNATIONAL: { title: 'International', icon: Globe },
};
