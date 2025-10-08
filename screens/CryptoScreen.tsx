
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Bitcoin } from 'lucide-react';

const CryptoScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Crypto" />
            <main className="p-4 text-center">
                 <Card>
                    <Bitcoin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Crypto Trading</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        This feature is under development. Soon you'll be able to buy, sell, and hold cryptocurrencies securely.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default CryptoScreen;
