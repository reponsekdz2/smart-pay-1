
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { ShoppingBag } from 'lucide-react';

const MarketplaceScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Marketplace" />
            <main className="p-4 text-center">
                 <Card>
                    <ShoppingBag className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Partner Marketplace</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Discover exclusive offers and services from our trusted partners.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default MarketplaceScreen;
