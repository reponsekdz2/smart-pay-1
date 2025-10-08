
import React, { useState } from 'react';
import Header from '../components/Header';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore';
import Config from '../constants/config';
import { apiGateway } from '../services/apiGateway';

const SendMoneyScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user, wallet, refreshWallet } = useUserStore();
    const [toPhone, setToPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [pin, setPin] = useState('');
    const [step, setStep] = useState(1); // 1: Form, 2: Confirm, 3: Result
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [txId, setTxId] = useState<string | null>(null);

    const handleNext = () => {
        setError('');
        if (!toPhone || toPhone.length < 12) {
            setError('Please enter a valid Rwandan phone number (e.g., 2507...).');
            return;
        }
        if (!amount || +amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        if (+amount > (wallet?.availableBalance ?? 0)) {
            setError('Insufficient funds.');
            return;
        }
        if (+amount > Config.DAILY_SEND_LIMIT) {
             setError(`Amount exceeds daily limit of ${Config.DAILY_SEND_LIMIT.toLocaleString()} RWF.`);
            return;
        }
        setStep(2);
    };

    const handleSend = async () => {
        if (pin.length !== 6) {
            setError('Please enter your 6-digit PIN.');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const res = await apiGateway.security.sendP2P({
                fromUserId: user!.id,
                toPhone,
                amount: +amount,
                description,
                pin,
            });

            if (res.success) {
                setTxId(res.data.id);
                setStep(3);
                await refreshWallet(); // Refresh balance in the store
            }
        } catch (err: any) {
            setError(err.message);
            setStep(2); // Go back to confirm step on error
        } finally {
            setIsLoading(false);
        }
    };

    if (step === 3) {
        return (
             <div className="p-6 flex flex-col h-full items-center justify-center text-center bg-background dark:bg-gray-900">
                <h1 className="text-2xl font-bold text-success">Transfer Successful!</h1>
                <p className="text-textSecondary dark:text-gray-400 mt-2">You sent {Number(amount).toLocaleString()} RWF to {toPhone}.</p>
                <p className="text-xs text-textTertiary dark:text-gray-500 mt-4">Transaction ID: {txId}</p>
                <button onClick={() => navigate('/')} className="mt-8 w-full bg-primary text-white font-bold py-4 rounded-lg">
                    Done
                </button>
            </div>
        )
    }

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full flex flex-col">
            <Header
                title={step === 1 ? "Send Money" : "Confirm Transfer"}
                leftAction={
                    <button onClick={() => step === 1 ? navigate(-1) : setStep(1)}>
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                }
            />
            <main className="flex-1 p-4 flex flex-col">
                
                <div className="flex-grow">
                    {error && <p className="mb-4 text-sm text-center text-error">{error}</p>}
                    
                    {step === 1 && (
                        <div className="space-y-4">
                            <input type="tel" value={toPhone} onChange={e => setToPhone(e.target.value)} placeholder="Recipient's Phone (2507...)" className="w-full p-3 bg-surface dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-textPrimary dark:text-white"/>
                            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (RWF)" className="w-full p-3 bg-surface dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-textPrimary dark:text-white"/>
                            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (Optional)" className="w-full p-3 bg-surface dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-textPrimary dark:text-white"/>
                        </div>
                    )}
                    
                    {step === 2 && (
                        <div className="space-y-4 text-center text-textPrimary dark:text-white">
                            <p>You are sending</p>
                            <p className="text-4xl font-bold">{Number(amount).toLocaleString()} RWF</p>
                            <p>To: <span className="font-semibold">{toPhone}</span></p>
                            <p>Fee: <span className="font-semibold">100 RWF</span></p>
                            <hr className="my-4 border-gray-200 dark:border-gray-700"/>
                            <p className="font-semibold">Enter your PIN to confirm</p>
                            <input type="password" value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, ''))} maxLength={6} className="w-full text-center tracking-[1em] p-3 bg-surface dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg" />
                        </div>
                    )}
                </div>

                {step === 1 && <button onClick={handleNext} className="w-full bg-primary text-white font-bold py-4 rounded-lg">Next</button>}
                {step === 2 && <button onClick={handleSend} disabled={isLoading} className="w-full bg-primary text-white font-bold py-4 rounded-lg disabled:bg-primary/50">{isLoading ? 'Sending...' : 'Confirm & Send'}</button>}

            </main>
        </div>
    );
};

export default SendMoneyScreen;
