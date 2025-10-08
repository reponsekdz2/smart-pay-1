
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Store } from 'lucide-react';

const MerchantDashboardScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Merchant Tools" />
            <main className="p-4 text-center">
                 <Card>
                    <Store className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Business Dashboard</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        This feature is intended for business accounts. Manage sales, accept payments, and grow your business with Smart Pay Pro.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default MerchantDashboardScreen;
