import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { ArrowLeft, Leaf, TrendingUp, Footprints } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore';
import type { ImpactFund, SDGMetric } from '../types';

const ImpactFundCard: React.FC<{ fund: ImpactFund }> = ({ fund }) => (
    <Card>
        <h3 className="font-bold text-textPrimary dark:text-white">{fund.name}</h3>
        <p className="text-xs font-semibold text-primary my-1">{fund.sector}</p>
        <p className="text-sm text-textSecondary dark:text-gray-400 mt-1">{fund.description}</p>
        <div className="flex justify-between items-end mt-4">
            <div>
                <p className="text-xs text-textSecondary dark:text-gray-400">Min. Investment</p>
                <p className="font-bold text-textPrimary dark:text-white">{fund.minInvestment.toLocaleString()} RWF</p>
            </div>
            <button className="text-sm font-semibold text-white bg-primary px-4 py-1.5 rounded-lg">Invest</button>
        </div>
    </Card>
);

const SDGCard: React.FC<{ metric: SDGMetric }> = ({ metric }) => (
    <div className="flex items-start p-3 bg-blue-100/50 dark:bg-blue-900/50 rounded-lg space-x-3">
        <div className="p-2 bg-blue-500 text-white rounded-full font-bold text-sm">
            {metric.goal}
        </div>
        <div>
            <p className="font-semibold text-sm text-blue-800 dark:text-blue-200">{metric.title}</p>
            <p className="text-xs text-blue-600 dark:text-blue-300">{metric.impact}</p>
        </div>
    </div>
);


const ImpactScreen: React.FC = () => {
    const navigate = useNavigate();
    const { impactFunds, sdgMetrics, user } = useUserStore();
    const carbonFootprint = user.transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0) / 1000 * 0.45; // Simplified calculation

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Impact Investing" />
            <div className="p-4 space-y-6">
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-primary"/>
                        Rwanda-Focused Impact Funds
                    </h2>
                    <div className="space-y-4">
                        {impactFunds.map(fund => <ImpactFundCard key={fund.id} fund={fund} />)}
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Leaf className="w-5 h-5 mr-2 text-primary"/>
                        Your SDG Alignment
                    </h2>
                    <Card>
                        <div className="space-y-2">
                           {sdgMetrics.map(metric => <SDGCard key={metric.goal} metric={metric} />)}
                        </div>
                    </Card>
                </div>
                 <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Footprints className="w-5 h-5 mr-2 text-primary"/>
                        Green Banking
                    </h2>
                     <Card>
                        <h3 className="font-semibold text-textPrimary dark:text-gray-100">Monthly Carbon Footprint</h3>
                        <p className="text-2xl font-bold text-success my-1">{carbonFootprint.toFixed(2)} kg CO₂</p>
                        <p className="text-xs text-textSecondary dark:text-gray-400">Calculated from your spending. You can offset this by investing in green projects.</p>
                        <button className="w-full text-center text-success font-semibold pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                           Offset Now
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ImpactScreen;
