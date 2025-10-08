import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowLeft, CheckCircle, Fingerprint } from 'lucide-react';
import { useUserStore } from '../hooks/useUserStore';

type Step = 'details' | 'confirm' | 'success';

const SendMoneyScreen: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>('details');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const { user, addTransaction } = useUserStore();

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (!recipient || !amount || isNaN(numericAmount) || numericAmount <= 0) {
            setError('Please enter a valid recipient and amount.');
            return;
        }
        if (numericAmount > user.balance) {
            setError('Insufficient balance.');
            return;
        }
        setError('');
        setStep('confirm');
    };
    
    const handleConfirmSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin !== user.pin) {
            setError('Incorrect PIN. Please try again.');
            return;
        }
        setError('');
        addTransaction({ recipient, amount: parseFloat(amount) });
        setStep('success');
        setTimeout(() => navigate('/dashboard'), 2000);
    };

    const renderDetailsStep = () => (
        <form onSubmit={handleDetailsSubmit} className="p-4 space-y-6 bg-surface flex-1">
            <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient's Name or Phone</label>
                <input
                    type="text"
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g., John Kagame or 078..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    required
                />
            </div>
            <div>
                 <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (RWF)</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    required
                />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primaryDark transition-colors">
                Continue
            </button>
        </form>
    );

     const renderConfirmStep = () => (
        <div className="p-4 text-center bg-surface flex-1">
            <p className="text-lg text-textSecondary">You are sending</p>
            <p className="text-5xl font-bold text-textPrimary my-4">{parseFloat(amount).toLocaleString()} RWF</p>
            <p className="text-lg text-textSecondary">to</p>
            <p className="text-2xl font-semibold text-textPrimary mt-1">{recipient}</p>
            
            <form onSubmit={handleConfirmSubmit} className="mt-8">
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Enter your 6-digit PIN</label>
                <input
                    type="password"
                    id="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    maxLength={6}
                    className="mt-1 block w-full text-center tracking-[1em] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    required
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                <button type="submit" className="mt-6 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primaryDark transition-colors">
                    Confirm & Send
                </button>
            </form>
        </div>
    );

    const renderSuccessStep = () => (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-surface">
            <CheckCircle className="w-24 h-24 text-success animate-bounce" />
            <h2 className="mt-6 text-2xl font-bold text-textPrimary">Payment Successful!</h2>
            <p className="text-lg text-textSecondary mt-2">
                You have sent {parseFloat(amount).toLocaleString()} RWF to {recipient}.
            </p>
        </div>
    );

    return (
        <div className="bg-background min-h-full flex flex-col">
            <Header
                title="Send Money"
                leftAction={
                    step !== 'success' ? (
                        <button onClick={() => step === 'details' ? navigate(-1) : setStep('details')}>
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    ) : null
                }
            />
            <div className="flex-grow">
                 {step === 'details' && renderDetailsStep()}
                 {step === 'confirm' && renderConfirmStep()}
                 {step === 'success' && renderSuccessStep()}
            </div>
        </div>
    );
};

export default SendMoneyScreen;