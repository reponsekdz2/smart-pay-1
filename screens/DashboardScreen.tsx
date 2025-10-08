import React, { useMemo } from 'react';
import { Bell, ScanLine, ArrowUpRight, Download, SlidersHorizontal, ArrowDownLeft, ShoppingCart, Power, HelpCircle } from 'lucide-react';
import Card from '../components/Card';
import type { Transaction, TransactionIconType } from '../types';
import { useUserStore } from '../hooks/useUserStore';
import { Link } from 'react-router-dom';
import FinancialHealthChart from '../components/charts/FinancialHealthChart';

const QuickActionButton: React.FC<{ icon: React.ElementType; label: string; to?: string }> = ({ icon: Icon, label, to }) => {
    const content = (
        <div className="flex flex-col items-center space-y-2">
            <div className="bg-primaryLight text-primary rounded-full p-4 hover:bg-primary/20 transition-all">
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-textPrimary">{label}</span>
        </div>
    );

    return to ? <Link to={to}>{content}</Link> : <button>{content}</button>;
};

const iconMap: { [key in TransactionIconType]: React.ElementType } = {
    'arrow-up-right': ArrowUpRight,
    'arrow-down-left': ArrowDownLeft,
    'shopping-cart': ShoppingCart,
    'power': Power,
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
            <p className="font-semibold text-textPrimary">{transaction.name}</p>
            <p className="text-sm text-textSecondary">{transaction.description}</p>
        </div>
        <div className={`font-bold ${transaction.amount > 0 ? 'text-success' : 'text-textPrimary'}`}>
            {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} RWF
        </div>
    </div>
);

const DashboardScreen: React.FC = () => {
    const { user } = useUserStore();

    const financialHealthScore = useMemo(() => {
        const income = user.transactions
            .filter(tx => tx.amount > 0)
            .reduce((sum, tx) => sum + tx.amount, 0);

        const spending = user.transactions
            .filter(tx => tx.amount < 0)
            .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
        
        if (income + spending === 0) return 75; // Default score
        
        return Math.round((income / (income + spending)) * 100);
    }, [user.transactions]);


    return (
        <div className="bg-background min-h-full">
            <header className="bg-surface p-4 flex justify-between items-center">
                 <div className="flex items-center space-x-3">
                    <img
                        src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full bg-gray-200"
                    />
                    <div>
                        <p className="text-sm text-textSecondary">Welcome Back,</p>
                        <p className="text-lg font-bold text-textPrimary">{user.name}</p>
                    </div>
                </div>
                <button className="relative text-textSecondary hover:text-primary">
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
                        <QuickActionButton icon={Download} label="Request" />
                        <QuickActionButton icon={ScanLine} label="Pay" />
                        <QuickActionButton icon={SlidersHorizontal} label="More" />
                    </div>
                </Card>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary mb-2 px-1">Recent Transactions</h2>
                    <Card>
                        {user.transactions.length > 0 ? (
                             <div className="divide-y divide-gray-100">
                                {user.transactions.slice(0, 3).map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
                            </div>
                        ) : (
                            <p className="text-center text-textSecondary py-4">No transactions yet.</p>
                        )}
                        {user.transactions.length > 3 && (
                             <button className="w-full text-center text-primary font-semibold pt-3">View All</button>
                        )}
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default DashboardScreen;