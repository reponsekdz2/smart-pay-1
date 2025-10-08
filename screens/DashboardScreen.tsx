import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore.ts';
import { apiGateway } from '../services/apiGateway.ts';
import type { Wallet, Transaction } from '../types.ts';
import Header from '../components/Header.tsx';
import Card from '../components/Card.tsx';
import { ArrowUpRight, ArrowDownLeft, Send, Download, ScanLine, Bell, User } from 'lucide-react';

const QuickActionButton: React.FC<{ icon: React.ElementType, label: string, onClick: () => void }> = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-2 text-textPrimary dark:text-gray-200">
        <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full text-primary">
            <Icon className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium">{label}</span>
    </button>
);

const TransactionItem: React.FC<{ transaction: Transaction; currentUserId: string }> = ({ transaction, currentUserId }) => {
    const isSent = transaction.fromWalletId.includes(currentUserId);
    return (
        <div className="flex items-center justify-between p-3 hover:bg-surface dark:hover:bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${isSent ? 'bg-red-100 dark:bg-red-900/50 text-error' : 'bg-green-100 dark:bg-green-900/50 text-success'}`}>
                    {isSent ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                </div>
                <div>
                    <p className="font-semibold text-textPrimary dark:text-white">{transaction.description}</p>
                    <p className="text-sm text-textSecondary dark:text-gray-400">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <p className={`font-bold ${isSent ? 'text-textPrimary dark:text-white' : 'text-success'}`}>
                {isSent ? '-' : '+'} {transaction.amount.toLocaleString()} RWF
            </p>
        </div>
    );
};

const DashboardScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const [walletRes, transactionsRes] = await Promise.all([
                    apiGateway.wallet.getWalletByUserId(user.id),
                    apiGateway.wallet.getTransactionsByUserId(user.id, 5)
                ]);
                if (walletRes.success) setWallet(walletRes.data!);
                if (transactionsRes.success) setTransactions(transactionsRes.data!);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            }
        };
        fetchData();
    }, [user]);

    const balance = wallet?.balance ?? 0;
    const name = user?.name.split(' ')[0] ?? 'User';

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header
                title={`Hello, ${name}`}
                leftAction={<button onClick={() => navigate('/profile')}><User className="w-6 h-6"/></button>}
                rightAction={<button><Bell className="w-6 h-6" /></button>}
            />
            <main className="p-4 space-y-6">
                <Card className="text-center bg-primary text-white">
                    <p className="text-sm text-primaryLight">Total Balance</p>
                    <p className="text-4xl font-bold mt-1">{balance.toLocaleString()} RWF</p>
                </Card>

                <div className="grid grid-cols-4 gap-4">
                    <QuickActionButton icon={Send} label="Send" onClick={() => navigate('/send')} />
                    <QuickActionButton icon={Download} label="Top Up" onClick={() => navigate('/topup')} />
                    <QuickActionButton icon={ScanLine} label="Scan" onClick={() => navigate('/scan')} />
                    <QuickActionButton icon={User} label="Pay" onClick={() => navigate('/payments')} />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-textPrimary dark:text-white mb-2">Recent Activity</h2>
                    <Card>
                        {transactions.length > 0 ? (
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {transactions.map(tx => <TransactionItem key={tx.id} transaction={tx} currentUserId={user!.id} />)}
                            </div>
                        ) : (
                            <p className="text-center text-textSecondary dark:text-gray-400 py-4">No recent transactions.</p>
                        )}
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default DashboardScreen;
