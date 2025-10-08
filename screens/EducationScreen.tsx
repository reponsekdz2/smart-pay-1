
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { BookOpen } from 'lucide-react';

const EducationScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Learn" />
            <main className="p-4 text-center">
                 <Card>
                    <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Financial Education</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Access articles, videos, and courses to improve your financial literacy.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default EducationScreen;
