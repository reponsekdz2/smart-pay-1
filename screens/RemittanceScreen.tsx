
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Globe } from 'lucide-react';

const RemittanceScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Global Transfers" />
            <main className="p-4 text-center">
                 <Card>
                    <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">International Remittance</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Send and receive money across borders with low fees and great rates.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default RemittanceScreen;
