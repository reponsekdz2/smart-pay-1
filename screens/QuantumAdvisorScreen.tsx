
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { BrainCircuit } from 'lucide-react';

const QuantumAdvisorScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Quantum Advisor" />
            <main className="p-4 text-center">
                 <Card>
                    <BrainCircuit className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">AI Financial Advisor</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        Coming soon! Get hyper-personalized financial advice powered by next-generation AI.
                    </p>
                 </Card>
            </main>
        </div>
    );
};

export default QuantumAdvisorScreen;
