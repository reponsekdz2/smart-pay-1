
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Trophy } from 'lucide-react';

const GamingScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Rewards & Games" />
            <main className="p-4 text-center">
                <Card>
                    <Trophy className="w-16 h-16 text-warning mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Gamification Center</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Earn points, unlock badges, and compete with friends by completing financial challenges.
                    </p>
                </Card>
            </main>
        </div>
    );
};

export default GamingScreen;
