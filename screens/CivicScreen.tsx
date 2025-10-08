
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Landmark } from 'lucide-react';

const CivicScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Civic Engagement" />
            <main className="p-4 text-center">
                 <Card>
                    <Landmark className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Community Projects</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Participate in and contribute to local community and government initiatives directly from the app.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default CivicScreen;
