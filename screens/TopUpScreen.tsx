import React from 'react';
import Header from '../components/Header';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopUpScreen: React.FC = () => {
    const navigate = useNavigate();

    // This is a simplified placeholder screen. 
    // A full implementation would be similar to SendMoneyScreen,
    // with provider selection, forms, and API calls to the payment service.

    return (
        <div className="bg-background min-h-full flex flex-col">
            <Header
                title="Top Up Wallet"
                leftAction={
                    <button onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                }
            />
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                 <h2 className="text-2xl font-bold text-textPrimary dark:text-white">Top Up Feature</h2>
                 <p className="text-textSecondary dark:text-gray-400 mt-2">
                    This feature is under construction. In a real app, you would select a provider (MTN, Bank, etc.) and complete a payment form to add money to your wallet.
                </p>
            </div>
        </div>
    );
};

export default TopUpScreen;
