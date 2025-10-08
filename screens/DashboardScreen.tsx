import React, { useMemo, useState } from 'react';
// FIX: Imported the 'Users' icon to resolve the 'Cannot find name' error.
import { Bell, ScanLine, ArrowUpRight, Download, SlidersHorizontal, ArrowDownLeft, ShoppingCart, Power, HelpCircle, Bot, Sparkles, TrendingUp, AlertTriangle, Users, Cpu } from 'lucide-react';
import Card from '../components/Card';
import type { Transaction, TransactionIconType, PredictiveInsight } from '../types';
import { useUserStore } from '../hooks/useUserStore';
import { Link, useNavigate } from 'react-router-dom';
import FinancialHealthChart from '../components/charts/FinancialHealthChart';
import SmartAssistantScreen from './SmartAssistantScreen';

// Mocked predictive insights
const mockInsights: PredictiveInsight[] = [
    { id: '1', type: 'spending_alert', title: 'Life Event Prediction', message: 'High probability of a major expense (e.g., home purchase) in 2-3 years.', confidence: 0.87, icon: AlertTriangle },
    { id: '2', type: 'saving_opportunity', title: 'Portfolio Optimization', message: 'Your portfolio can be optimized for a 1.5% higher return at the same risk level.', confidence: 0.92, icon: Sparkles },
    { id: '3', type: 'investment_alert', title: 'Tax Strategy Alert', message: 'Potential to save 25,000 RWF in taxes with AI-suggested strategies.', confidence: 0.78, icon: TrendingUp },
];

const InsightCard: React.FC<{ insight: PredictiveInsight }> = ({ insight }) => {
    const colorClasses = {
        spending_alert: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400',
        saving_opportunity: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400',
        investment_alert: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    };

    return (
        <div className="flex items-start p-3 bg-surface dark:bg-gray-800 rounded-lg space-x-3">
            <div className={`p-2 rounded-full ${colorClasses[insight.type]}`}>
                <insight.icon className="w-5 h-5" />
            </div>
            <div>
                <p className="font-semibold text-sm text-textPrimary dark:text-gray-100">{insight.title}</p>
                <p className="text-xs text-textSecondary dark:text-gray-400">{insight.message}</p>
            </div>
        </div>
    );
};


const QuickActionButton: React.FC<{ icon: React.ElementType; label: string; to?: string }> = ({ icon: Icon, label, to }) => {
    const content = (
        <div className="flex flex-col items-center space-y-2">
            <div className="bg-primaryLight dark:bg-primary/20 text-primary dark:text-primaryLight rounded-full p-4 hover:bg-primary/20 transition-all">
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-textPrimary dark:text-gray-200">{label}</span>
        </div>
    );

    return to ? <Link to={to}>{content}</Link> : <button>{content}</button>;
};

const iconMap: { [key in TransactionIconType]: React.ElementType } = {
    'arrow-up-right': ArrowUpRight,
    'arrow-down-left': ArrowDownLeft,
    'shopping-cart': ShoppingCart,
    'power': Power,
    'users': Users,
    'landmark': SlidersHorizontal,
};

const TransactionIcon: React.FC<{ iconName: TransactionIconType; className?: string; }> = ({ iconName, className }) => {
    const IconComponent = iconMap[iconName] || HelpCircle;
    return <IconComponent className={className} />;
};


const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <div className="flex items-center py-3">
        <div className={`rounded-full p-2 mr-4 ${transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <TransactionIcon iconName={transaction.iconName} className="w-5 h-5" />
        </div>
        <div className="flex-grow">
            <p className="font-semibold text-textPrimary dark:text-gray-100">{transaction.name}</p>
            <p className="text-sm text-textSecondary dark:text-gray-400">{transaction.description}</p>
        </div>
        <div className={`font-bold ${transaction.amount > 0 ? 'text-success' : 'text-textPrimary dark:text-gray-200'}`}>
            {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} RWF
        </div>
    </div>
);

const DashboardScreen: React.FC = () => {
    const { user } = useUserStore();
    const [isAssistantOpen, setAssistantOpen] = useState(false);
    const navigate = useNavigate();

    const financialHealthScore = useMemo(() => {
        const income = user.transactions
            .filter(tx => tx.amount > 0)
            .reduce((sum, tx) => sum + tx.amount, 0);

        const spending = user.transactions
            .filter(tx => tx.amount < 0)
            .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
        
        if (income + spending === 0) return 75;
        
        return Math.round((income / (income + spending)) * 100);
    }, [user.transactions]);

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full relative pb-24">
            <header className="bg-surface dark:bg-gray-800 p-4 flex justify-between items-center">
                 <div className="flex items-center space-x-3">
                    <img
                        src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full bg-gray-200"
                    />
                    <div>
                        <p className="text-sm text-textSecondary dark:text-gray-400">Welcome Back,</p>
                        <p className="text-lg font-bold text-textPrimary dark:text-gray-100">{user.name}</p>
                    </div>
                </div>
                <button className="relative text-textSecondary dark:text-gray-300 hover:text-primary">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-warning rounded-full"></span>
                </button>
            </header>

            <main className="p-4 space-y-6">
                <Card className="bg-gradient-to-br from-primaryDark to-primary text-white flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm opacity-80">Total Balance</p>
                        <p className="text-4xl font-bold mt-1 tracking-tight">{user.balance.toLocaleString()} RWF</p>
                    </div>
                    <div className="w-24 h-24 -mr-2">
                        <FinancialHealthChart score={financialHealthScore} />
                    </div>
                </Card>

                <Card>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <QuickActionButton icon={ArrowUpRight} label="Send" to="/send-money" />
                        <QuickActionButton icon={Download} label="Top-Up" to="/top-up" />
                        <QuickActionButton icon={ScanLine} label="Pay" to="/qr-scanner"/>
                        <Link to="/more" className="flex flex-col items-center space-y-2">
                            <div className="bg-gray-100 dark:bg-gray-700 text-textSecondary dark:text-gray-300 rounded-full p-4">
                                <SlidersHorizontal className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-medium text-textPrimary dark:text-gray-200">More</span>
                        </Link>
                    </div>
                </Card>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-2 px-1">Quantum AI Insights</h2>
                    <Card>
                        <div className="space-y-2">
                            {mockInsights.map(insight => <InsightCard key={insight.id} insight={insight} />)}
                        </div>
                        <button 
                            onClick={() => navigate('/advisor')}
                            className="w-full text-center text-primary font-bold pt-3 mt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-center">
                            Open Full Advisor <Cpu className="w-4 h-4 ml-2"/>
                        </button>
                    </Card>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-2 px-1">Recent Transactions</h2>
                    <Card>
                        {user.transactions.length > 0 ? (
                             <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {user.transactions.slice(0, 3).map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
                            </div>
                        ) : (
                            <p className="text-center text-textSecondary dark:text-gray-400 py-4">No transactions yet.</p>
                        )}
                        {user.transactions.length > 3 && (
                             <button className="w-full text-center text-primary font-semibold pt-3">View All</button>
                        )}
                    </Card>
                </div>
            </main>

            <button
                onClick={() => setAssistantOpen(true)}
                className="absolute bottom-20 right-4 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primaryDark transition-transform transform hover:scale-110"
                aria-label="Open Smart Assistant"
            >
                <Bot className="w-6 h-6" />
            </button>
            
            {isAssistantOpen && <SmartAssistantScreen onClose={() => setAssistantOpen(false)} />}
        </div>
    );
};

export default DashboardScreen;