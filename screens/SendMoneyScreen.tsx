
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.tsx';
import { ArrowLeft, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useUserStore } from '../hooks/useUserStore.ts';
import { apiGateway } from '../services/apiGateway.ts';
import type { Transaction } from '../types.ts';

const SendMoneyScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [step, setStep] = useState(1); // 1: Form, 2: Loading, 3: Result
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<{ success: boolean; data?: Transaction; error?: string } | null>(null);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!user) return;
        
        setStep(2); // Loading state

        try {
            const response = await apiGateway.payment.sendMoney({
                fromUserId: user.id,
                toPhone: phone,
                amount: parseFloat(amount),
                description,
            });
            setResult(response);
        } catch (err: any) {
            setResult({ success: false, error: err.message });
        } finally {
            setStep(3); // Result state
        }
    };

    if (step === 2) {
        return (
            <div className="bg-background dark:bg-gray-900 min-h-full flex flex-col items-center justify-center text-center">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <h2 className="text-2xl font-bold mt-4 text-textPrimary dark:text-white">Processing Transaction...</h2>
                <p className="text-textSecondary dark:text-gray-400">Please wait.</p>
            </div>
        );
    }

    if (step === 3 && result) {
        return (
             <div className="bg-background dark:bg-gray-900 min-h-full flex flex-col items-center justify-center text-center p-4">
                {result.success ? (
                    <CheckCircle className="w-24 h-24 text-success mb-4" />
                ) : (
                    <XCircle className="w-24 h-24 text-error mb-4" />
                )}
                <h2 className="text-2xl font-bold text-textPrimary dark:text-white">
                    {result.success ? 'Transaction Successful' : 'Transaction Failed'}
                </h2>
                <p className="text-textSecondary dark:text-gray-400 mt-2">
                    {result.success ? `You have successfully sent ${result.data?.amount.toLocaleString()} RWF.` : result.error}
                </p>
                <button onClick={() => navigate('/')} className="mt-8 bg-primary text-white font-bold py-3 px-6 rounded-lg">
                    Back to Dashboard
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full flex flex-col">
            <Header
                title="Send Money"
                leftAction={<button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>}
            />
            <main className="flex-1 p-4">
                <form onSubmit={handleSend} className="flex flex-col h-full">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-textSecondary dark:text-gray-300">Recipient's Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder="e.g., 2507..."
                                className="mt-1 w-full p-3 bg-surface dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                                required
                            />
                        </div>
                         <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-textSecondary dark:text-gray-300">Amount (RWF)</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                placeholder="0"
                                className="mt-1 w-full p-3 bg-surface dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                                required
                            />
                        </div>
                         <div>
                            <label htmlFor="description" className="block text-sm font-medium text-textSecondary dark:text-gray-300">Description (Optional)</label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="e.g., For lunch"
                                className="mt-1 w-full p-3 bg-surface dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                            />
                        </div>
                    </div>
                    {error && <p className="mt-4 text-sm text-error">{error}</p>}
                    <div className="flex-grow" />
                    <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-primary text-white font-bold py-4 rounded-lg">
                        <Send className="w-5 h-5"/>
                        <span>Send</span>
                    </button>
                </form>
            </main>
        </div>
    );
};

export default SendMoneyScreen;
