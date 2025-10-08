
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Users } from 'lucide-react';

const CommunityScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Community" />
            <main className="p-4 text-center">
                 <Card>
                    <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Community Hub</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Connect with others, join savings groups, and learn together.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default CommunityScreen;
