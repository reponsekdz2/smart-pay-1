import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Link as LinkIcon } from 'lucide-react';

const NetworkScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="My Network" />
            <main className="p-4 text-center">
                 <Card>
                    <LinkIcon className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Your Professional Network</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Connect with peers, mentors, and financial experts to grow your network.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default NetworkScreen;
