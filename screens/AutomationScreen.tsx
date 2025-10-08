
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Zap } from 'lucide-react';

const AutomationScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Automation" />
            <main className="p-4 text-center">
                 <Card>
                    <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Financial Automation</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Set up rules to automatically manage your money, like auto-saving or bill payments.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default AutomationScreen;
