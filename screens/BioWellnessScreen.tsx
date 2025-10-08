
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { HeartPulse } from 'lucide-react';

const BioWellnessScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Bio-Wellness" />
            <main className="p-4 text-center">
                 <Card>
                    <HeartPulse className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Health & Wellness</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Connect your health data to get personalized financial advice for wellness goals.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default BioWellnessScreen;
