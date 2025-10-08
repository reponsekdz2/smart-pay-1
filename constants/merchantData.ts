import type { MerchantData } from '../types';

export const mockMerchantData: MerchantData = {
    stats: [
        { title: "Today's Sales", value: '125,430 RWF', change: '+15%', trend: 'up' },
        { title: 'Pending Orders', value: '18', change: '+3', trend: 'up' },
        { title: 'New Customers', value: '12', change: '+5%', trend: 'up' },
    ],
    inventory: [
        { id: '1', name: 'Inyange Milk 1L', stock: 45, price: 1200 },
        { id: '2', name: 'Gourmet Coffee 250g', stock: 12, price: 5500 },
        { id: '3', name: 'Handwoven Basket', stock: 8, price: 15000 },
    ],
};
