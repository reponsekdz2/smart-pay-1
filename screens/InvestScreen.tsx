
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { BarChart2 } from 'lucide-react';

const InvestScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="My Investments" />
            <main className="p-4 text-center">
                 <Card>
                    <BarChart2 className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Investment Portfolio</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        This feature is under development. Soon you'll be able to invest in stocks, bonds, and other assets.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default InvestScreen;
