
import React from 'react';
import { ArrowRight, Bell, Send, ArrowDownCircle } from 'lucide-react';
import { useUserStore } from '../hooks/useUserStore';
import Header from '../components/Header';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const ActionButton: React.FC<{ icon: React.ElementType, label: string, onClick: () => void }> = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center space-y-2">
        <div className="w-14 h-14 bg-primary/10 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
        </div>
        <span className="text-sm font-medium text-textPrimary dark:text-gray-200">{label}</span>
    </button>
);

const DashboardScreen: React.FC = () => {
    const { user, wallet } = useUserStore();
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header 
                title={`Welcome, ${user?.name?.split(' ')[0]}`}
                rightAction={<button><Bell className="w-6 h-6 text-textPrimary dark:text-white" /></button>}
            />
            <main className="p-4 space-y-6">
                <Card className="bg-primary text-white dark:bg-primaryDark">
                    <p className="text-sm text-primaryLight">Total Balance</p>
                    <p className="text-4xl font-bold mt-1">{wallet?.balance.toLocaleString()} RWF</p>
                    <div className="mt-4 flex justify-between items-center text-sm">
                        <span>Available: {wallet?.availableBalance.toLocaleString()} RWF</span>
                        <button onClick={() => navigate('/analytics')} className="flex items-center font-semibold">
                            Analytics <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </Card>

                <div className="grid grid-cols-4 gap-4 text-center">
                    <ActionButton icon={Send} label="Send" onClick={() => navigate('/send')} />
                    <ActionButton icon={ArrowDownCircle} label="Top Up" onClick={() => navigate('/topup')} />
                    <ActionButton icon={Send} label="Pay Bill" onClick={() => navigate('/payments')} />
                    <ActionButton icon={ArrowDownCircle} label="Withdraw" onClick={() => alert('Withdraw clicked')} />
                </div>
                
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg text-textPrimary dark:text-white">Recent Activity</h2>
                        <button className="text-primary font-semibold text-sm">View All</button>
                    </div>
                    {/* Placeholder for recent transactions list */}
                    <div className="space-y-3">
                         <p className="text-textSecondary dark:text-gray-400">No recent transactions to show.</p>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default DashboardScreen;
