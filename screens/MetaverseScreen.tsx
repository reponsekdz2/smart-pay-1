
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Orbit } from 'lucide-react';

const MetaverseScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Metaverse" />
            <main className="p-4 text-center">
                 <Card>
                    <Orbit className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Metaverse Banking</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Explore the future of finance with our integrated metaverse experiences.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default MetaverseScreen;
