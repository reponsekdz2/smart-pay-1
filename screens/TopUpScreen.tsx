import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowLeft, CheckCircle, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import { useUserStore } from '../hooks/useUserStore';
import type { PaymentProvider } from '../types';
import { paymentProviders, providerCategories } from '../constants/paymentProviders';

const ProviderCard: React.FC<{ provider: PaymentProvider, onSelect: () => void }> = ({ provider, onSelect }) => (
    <button onClick={onSelect} className="w-full text-left p-4 bg-surface rounded-lg shadow-sm hover:bg-primaryLight transition-colors flex items-center space-x-4">
        <div className="p-3 bg-gray-100 text-primary rounded-lg">
            <provider.icon className="w-6 h-6" />
        </div>
        <div className="flex-grow">
            <h3 className="font-semibold text-textPrimary">{provider.name}</h3>
            <p className="text-xs text-textSecondary">
                Fees: {provider.fees} • Speed: {provider.speed}
            </p>
        </div>
    </button>
);

const PaymentProviderSelector: React.FC<{ onSelectProvider: (provider: PaymentProvider) => void }> = ({ onSelectProvider }) => {
    return (
        <div className="p-4 space-y-6">
            {Object.entries(providerCategories).map(([category, { title, icon: Icon }]) => (
                <div key={category}>
                    <h2 className="text-lg font-bold text-textPrimary mb-3 flex items-center">
                        <Icon className="w-5 h-5 mr-2 text-textSecondary" />
                        {title}
                    </h2>
                    <div className="space-y-3">
                        {paymentProviders
                            .filter(p => p.category === category)
                            .map(provider => (
                                <ProviderCard key={provider.id} provider={provider} onSelect={() => onSelectProvider(provider)} />
                            ))}
                    </div>
                </div>
            ))}
            <div className="flex justify-center space-x-4 pt-4 text-xs text-textSecondary">
                <span className="flex items-center"><Lock className="w-3 h-3 mr-1" /> End-to-End Encryption</span>
                <span className="flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> BNR Regulated</span>
            </div>
        </div>
    );
};

const TopUpScreen: React.FC = () => {
    const navigate = useNavigate();
    const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
    const [amount, setAmount] = useState('');
    const [formState, setFormState] = useState<Record<string, string>>({});
    const [step, setStep] = useState<'select' | 'form' | 'processing' | 'success'>('select');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { processTopUp } = useUserStore();

    const handleProviderSelect = (provider: PaymentProvider) => {
        setSelectedProvider(provider);
        setStep('form');
    };

    const handleFormChange = (id: string, value: string) => {
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        if (selectedProvider?.formFields.some(field => !formState[field.id])) {
            setError('Please fill in all required fields.');
            return;
        }
        
        setIsLoading(true);
        setError('');
        setStep('processing');

        try {
            const request = {
                amount: numericAmount,
                recipient: 'self', // Topping up own wallet
                description: `Top-up via ${selectedProvider!.name}`,
                providerData: { ...formState, providerId: selectedProvider!.id }
            };
            await processTopUp(request);
            setStep('success');
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (e: any) {
            setError(e.message || 'An unexpected error occurred.');
            setStep('form');
        } finally {
            setIsLoading(false);
        }
    };

    const resetFlow = () => {
        setSelectedProvider(null);
        setAmount('');
        setFormState({});
        setError('');
        setStep('select');
    };

    const renderForm = () => {
        if (!selectedProvider) return null;
        return (
            <form onSubmit={handleSubmit} className="p-4 space-y-6 bg-surface flex-1">
                 <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount to Top Up (RWF)</label>
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
                {selectedProvider.formFields.map(field => (
                     <div key={field.id}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
                        <input
                            type={field.type}
                            id={field.id}
                            value={formState[field.id] || ''}
                            onChange={(e) => handleFormChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>
                ))}
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primaryDark transition-colors">
                    Top Up {parseFloat(amount || '0').toLocaleString()} RWF
                </button>
            </form>
        );
    };

    const renderProcessingStep = () => (
         <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-surface">
            <Loader2 className="w-24 h-24 text-primary animate-spin" />
            <h2 className="mt-6 text-2xl font-bold text-textPrimary">Processing Top-Up...</h2>
            <p className="text-lg text-textSecondary mt-2">
                Please wait while we securely process your payment.
            </p>
        </div>
    );
    
     const renderSuccessStep = () => (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-surface">
            <CheckCircle className="w-24 h-24 text-success animate-bounce" />
            <h2 className="mt-6 text-2xl font-bold text-textPrimary">Top Up Successful!</h2>
            <p className="text-lg text-textSecondary mt-2">
                You have added {parseFloat(amount).toLocaleString()} RWF to your wallet.
            </p>
        </div>
    );

    return (
        <div className="bg-background min-h-full flex flex-col">
            <Header
                title={step === 'select' ? 'Top Up Wallet' : `Via ${selectedProvider?.name}`}
                leftAction={
                    step !== 'processing' && step !== 'success' ? (
                        <button onClick={() => step === 'form' ? resetFlow() : navigate(-1)}>
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    ) : null
                }
            />
            <div className="flex-grow">
                {step === 'select' && <PaymentProviderSelector onSelectProvider={handleProviderSelect} />}
                {step === 'form' && renderForm()}
                {step === 'processing' && renderProcessingStep()}
                {step === 'success' && renderSuccessStep()}
            </div>
        </div>
    );
};

export default TopUpScreen;