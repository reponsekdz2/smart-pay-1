import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import { apiGateway } from '../services/apiGateway';
import { useUserStore } from '../hooks/useUserStore';

const SendMoneyScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [recipientPhone, setRecipientPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        
        setError('');
        setSuccess('');
        setIsLoading(true);
        try {
            const response = await apiGateway.payment.sendMoney({
                fromUserId: user.id,
                toPhone: recipientPhone,
                amount: parseFloat(amount),
                description,
            });

            if (response.success && response.data) {
                setSuccess(`Successfully sent ${response.data.amount} RWF to ${recipientPhone}!`);
                setRecipientPhone('');
                setAmount('');
                setDescription('');
            } else {
                setError(response.error || 'Transaction failed.');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header
                title="Send Money"
                leftAction={<button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>}
            />
            <main className="p-4">
                <Card>
                    <form onSubmit={handleSend} className="space-y-4">
                        <div>
                            <label htmlFor="recipient" className="block text-sm font-medium text-textSecondary dark:text-gray-400">Recipient's Phone</label>
                            <input
                                type="tel"
                                id="recipient"
                                value={recipientPhone}
                                onChange={(e) => setRecipientPhone(e.target.value)}
                                placeholder="e.g., 2507..."
                                className="mt-1 block w-full px-3 py-2 bg-background dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-textSecondary dark:text-gray-400">Amount (RWF)</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="mt-1 block w-full px-3 py-2 bg-background dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-textSecondary dark:text-gray-400">Description</label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="e.g., For lunch"
                                className="mt-1 block w-full px-3 py-2 bg-background dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        {error && <p className="text-sm text-error">{error}</p>}
                        {success && <p className="text-sm text-success">{success}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center space-x-2 bg-primary text-white font-bold py-3 rounded-lg mt-4 disabled:bg-primary/50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
                            <span>{isLoading ? 'Sending...' : 'Send Money'}</span>
                        </button>
                    </form>
                </Card>
            </main>
        </div>
    );
};

export default SendMoneyScreen;
