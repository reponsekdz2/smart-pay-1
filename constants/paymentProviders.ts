
import type { PaymentProvider } from "../types";

export const PAYMENT_PROVIDERS: PaymentProvider[] = [
    {
        id: 'mtn',
        name: 'MTN Mobile Money',
        type: 'momo',
        logo: '/assets/logos/mtn.png',
    },
    {
        id: 'airtel',
        name: 'Airtel Money',
        type: 'momo',
        logo: '/assets/logos/airtel.png',
    },
    {
        id: 'bk',
        name: 'Bank of Kigali',
        type: 'bank',
        logo: '/assets/logos/bk.png',
    },
    {
        id: 'visa',
        name: 'Visa/Mastercard',
        type: 'card',
        logo: '/assets/logos/visa.png',
    }
];
