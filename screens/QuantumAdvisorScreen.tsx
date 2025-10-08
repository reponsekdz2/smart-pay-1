import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { ArrowLeft, Cpu, BrainCircuit, Activity, FileText, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { LifeEventPredictions, AIStrategy } from '../types';

const mockLifeEvents: LifeEventPredictions = {
    marriage: 85,
    children: 72,
    homePurchase: 65,
    retirement: 91,
    emergency: 23,
};

const mockStrategies: AIStrategy[] = [
    { id: '1', title: 'Portfolio Optimizer', description: 'Rebalance portfolio using a Black-Litterman model to increase expected returns.', category: 'Portfolio', icon: Activity },
    { id: '2', title: 'Tax Optimization', description: 'Utilize tax-loss harvesting to reduce this year\'s tax liability by an estimated 35,000 RWF.', category: 'Tax', icon: FileText },
    { id: '3', title: 'Estate Planning AI', description: 'Generate a basic will and explore trust setup options to secure your legacy.', category: 'Estate', icon: Landmark },
];

const LifeEventsChart: React.FC = () => {
    const data = Object.entries(mockLifeEvents).map(([name, value]) => ({ name, probability: value }));
    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)"/>
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: 'gray', fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: 'gray', fontSize: 12 }}/>
                    <Tooltip />
                    <Bar dataKey="probability" fill="#1877F2" background={{ fill: '#eee' }} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const StrategyCard: React.FC<{ strategy: AIStrategy }> = ({ strategy }) => (
    <div className="flex items-start p-3 bg-surface dark:bg-gray-700/50 rounded-lg space-x-3">
        <div className="p-2 bg-primaryLight text-primary rounded-full">
            <strategy.icon className="w-5 h-5" />
        </div>
        <div>
            <p className="font-semibold text-sm text-textPrimary dark:text-gray-100">{strategy.title}</p>
            <p className="text-xs text-textSecondary dark:text-gray-400">{strategy.description}</p>
        </div>
    </div>
);


const QuantumAdvisorScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Quantum AI Advisor" leftAction={<button onClick={() => navigate(-1)}><ArrowLeft/></button>} />
            <div className="p-4 space-y-6">
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Cpu className="w-5 h-5 mr-2 text-primary"/>
                        Neural Financial Analysis
                    </h2>
                    <Card>
                        <h3 className="font-semibold text-textPrimary dark:text-gray-100">Life Event Predictions</h3>
                        <p className="text-xs text-textSecondary dark:text-gray-400 mb-2">Based on 10,000 Monte Carlo simulations of your financial data.</p>
                        <LifeEventsChart />
                    </Card>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <BrainCircuit className="w-5 h-5 mr-2 text-primary"/>
                        AI-Generated Financial Strategies
                    </h2>
                     <Card>
                        <div className="space-y-3">
                           {mockStrategies.map(strategy => <StrategyCard key={strategy.id} strategy={strategy} />)}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default QuantumAdvisorScreen;
