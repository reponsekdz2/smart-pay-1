
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore.ts';
import { apiGateway } from '../services/apiGateway.ts';
import type { Wallet, Transaction } from '../types.ts';
import { ArrowUpRight, ArrowDownLeft, Send, Download, QrCode, Bell } from 'lucide-react';
import Card from '../components/Card.tsx';

const DashboardScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                setIsLoading(true);
                const [walletRes, transactionsRes] = await Promise.all([
                    apiGateway.wallet.getWallet(user.id),
                    apiGateway.wallet.getTransactions(user.id)
                ]);

                if (walletRes.success) setWallet(walletRes.data!);
                if (transactionsRes.success) setTransactions(transactionsRes.data!);

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [user]);
    
    const QuickActionButton: React.FC<{ icon: React.ElementType, label: string, path: string }> = ({ icon: Icon, label, path }) => (
        <button onClick={() => navigate(path)} className="flex flex-col items-center space-y-1">
            <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-textPrimary dark:text-gray-200">{label}</span>
        </button>
    );
    
    const TransactionItem: React.FC<{ tx: Transaction, currentWalletId: string }> = ({ tx, currentWalletId }) => {
        const isSent = tx.fromWalletId === currentWalletId;
        const description = isSent ? `To: Recipient` : `From: Sender`; // Placeholder, would resolve to name in a real app
        return (
            <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                     <div className={`p-2 rounded-full ${isSent ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'}`}>
                        {isSent ? <ArrowUpRight className="w-5 h-5 text-red-500" /> : <ArrowDownLeft className="w-5 h-5 text-green-500" />}
                    </div>
                    <div>
                        <p className="font-semibold text-textPrimary dark:text-white">{tx.description}</p>
                        <p className="text-xs text-textSecondary dark:text-gray-400">{new Date(tx.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                 <p className={`font-bold ${isSent ? 'text-error' : 'text-success'}`}>
                    {isSent ? '-' : '+'} {tx.amount.toLocaleString()} RWF
                </p>
            </div>
        );
    };

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <header className="p-4 flex justify-between items-center">
                <div>
                    <p className="text-sm text-textSecondary dark:text-gray-400">Welcome back,</p>
                    <h1 className="text-2xl font-bold text-textPrimary dark:text-white">{user?.name}</h1>
                </div>
                <button className="relative p-2">
                    <Bell className="w-6 h-6 text-textPrimary dark:text-white" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-error ring-2 ring-background dark:ring-gray-900" />
                </button>
            </header>
            
            <main className="p-4 space-y-6">
                <Card className="bg-primary text-white">
                    <p className="text-sm text-primaryLight">Total Balance</p>
                    {isLoading ? (
                         <div className="h-10 w-48 bg-white/20 animate-pulse rounded-md mt-1"></div>
                    ) : (
                        <p className="text-4xl font-bold">{wallet?.balance.toLocaleString()} RWF</p>
                    )}
                </Card>

                <div className="grid grid-cols-4 gap-4">
                    <QuickActionButton icon={Send} label="Send" path="/send" />
                    <QuickActionButton icon={Download} label="Top Up" path="/topup" />
                    <QuickActionButton icon={QrCode} label="Scan" path="/scan" />
                    <QuickActionButton icon={Bell} label="Bills" path="/payments" /> 
                </div>

                <div>
                    <h2 className="text-lg font-bold text-textPrimary dark:text-white mb-2">Recent Activity</h2>
                    <Card>
                        {isLoading ? (
                             <p className="text-center text-textSecondary dark:text-gray-400">Loading transactions...</p>
                        ) : transactions.length > 0 ? (
                           <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {transactions.slice(0, 4).map(tx => wallet && <TransactionItem key={tx.id} tx={tx} currentWalletId={wallet.id} />)}
                           </div>
                        ) : (
                            <p className="text-center text-textSecondary dark:text-gray-400">No recent transactions.</p>
                        )}
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default DashboardScreen;
