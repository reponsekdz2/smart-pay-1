
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Leaf } from 'lucide-react';

const ImpactScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="My Impact" />
            <main className="p-4 text-center">
                <Card>
                    <Leaf className="w-16 h-16 text-success mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Track Your Impact</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        This feature is coming soon. You'll be able to see the positive social and environmental impact of your investments and spending.
                    </p>
                </Card>
            </main>
        </div>
    );
};

export default ImpactScreen;
