
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { TerminalSquare } from 'lucide-react';

const DeveloperScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Developer API" />
            <main className="p-4 text-center">
                 <Card>
                    <TerminalSquare className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Developer Tools</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Access our APIs to build on top of the Smart Pay platform.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default DeveloperScreen;
