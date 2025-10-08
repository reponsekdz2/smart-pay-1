import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowLeft, CheckCircle, Fingerprint, Loader2 } from 'lucide-react';
import { useUserStore } from '../hooks/useUserStore';

type Step = 'details' | 'confirm' | 'processing' | 'success';

const SendMoneyScreen: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState<Step>('details');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { user, processTransaction } = useUserStore();

    useEffect(() => {
        if (location.state?.recipient) setRecipient(location.state.recipient);
        if (location.state?.amount) setAmount(location.state.amount.toString());
    }, [location.state]);


    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (!recipient || !amount || isNaN(numericAmount) || numericAmount <= 0) {
            setError('Please enter a valid recipient and amount.');
            return;
        }
        if (!user || numericAmount > user.balance) {
            setError('Insufficient balance.');
            return;
        }
        setError('');
        setStep('confirm');
    };
    
    const handlePayment = async () => {
        setIsLoading(true);
        setError('');
        setStep('processing');
        try {
            const request = {
                amount: parseFloat(amount),
                recipient: recipient,
                description: `Transfer to ${recipient}`,
                providerData: { phone: recipient } // Assuming recipient is a phone number for MoMo
            };
            await processTransaction(request);
            setStep('success');
            setTimeout(() => navigate('/dashboard', { replace: true }), 2000);
        } catch (e: any) {
            setError(e.message || 'An unexpected error occurred.');
            setStep('confirm'); // Go back to confirm step on error
        } finally {
            setIsLoading(false);
        }
    };
    
    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, the PIN would be part of the auth service call
        // Here we simulate checking it conceptually before proceeding.
        if (pin !== user?.pin) {
            setError('Incorrect PIN. Please try again.');
            return;
        }
        handlePayment();
    };
    
    // Simulate biometric auth and then proceed
    const handleBiometricSubmit = () => handlePayment();


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
        <div className="p-4 text-center bg-surface flex-1 flex flex-col justify-between">
            <div>
                <p className="text-lg text-textSecondary">You are sending</p>
                <p className="text-5xl font-bold text-textPrimary my-4">{parseFloat(amount).toLocaleString()} RWF</p>
                <p className="text-lg text-textSecondary">to</p>
                <p className="text-2xl font-semibold text-textPrimary mt-1">{recipient}</p>
            </div>
            
            <div className="mt-8">
                <form onSubmit={handlePinSubmit}>
                    <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Enter your 6-digit PIN to confirm</label>
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
                 <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <button
                    onClick={handleBiometricSubmit}
                    className="w-full flex items-center justify-center bg-gray-100 text-textPrimary font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <Fingerprint className="w-6 h-6 mr-2 text-primary" />
                    Authenticate with Biometrics
                </button>
            </div>
        </div>
    );
    
    const renderProcessingStep = () => (
         <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-surface">
            <Loader2 className="w-24 h-24 text-primary animate-spin" />
            <h2 className="mt-6 text-2xl font-bold text-textPrimary">Processing Transaction...</h2>
            <p className="text-lg text-textSecondary mt-2">
                Please wait while we securely process your payment.
            </p>
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
                    step !== 'success' && step !== 'processing' ? (
                        <button onClick={() => step === 'details' ? navigate(-1) : setStep('details')}>
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    ) : null
                }
            />
            <div className="flex-grow">
                 {step === 'details' && renderDetailsStep()}
                 {step === 'confirm' && renderConfirmStep()}
                 {step === 'processing' && renderProcessingStep()}
                 {step === 'success' && renderSuccessStep()}
            </div>
        </div>
    );
};

export default SendMoneyScreen;