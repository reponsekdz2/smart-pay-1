import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
// FIX: Add .ts extension to file paths
import { useUserStore } from '../../hooks/useUserStore.ts';
import type { RegisterDto } from '../../types.ts';

interface KycScreenProps {
    regData: Partial<RegisterDto>;
}

const KycScreen: React.FC<KycScreenProps> = ({ regData }) => {
    const { register, login, error: storeError } = useUserStore();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim().split(' ').length < 2) {
            setFormError('Please enter your full name.');
            return;
        }
        if (nationalId.length !== 16) {
            setFormError('Please enter a valid 16-digit National ID.');
            return;
        }
        setFormError('');
        setIsLoading(true);

        const finalData: RegisterDto = {
            ...regData,
            name,
            nationalId,
        } as RegisterDto;

        try {
            await register(finalData);
            await login({ phone: finalData.phone!, pin: finalData.pin! });
            setIsSuccess(true);
        } catch (e) {
            setFormError(storeError || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate('/', { replace: true });
            }, 4000); // Redirect after showing the success message
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    if (isSuccess) {
        return (
            <div className="p-6 flex flex-col h-full bg-backgroundDark text-white items-center justify-center text-center animate-fade-in-down">
                <CheckCircle className="w-24 h-24 text-success mb-4" />
                <h1 className="text-3xl font-bold text-white">Welcome Aboard!</h1>
                <p className="text-gray-300 mt-2 mb-8">Your Smart Pay PRO account is ready.</p>
                
                <div className="text-left bg-black/20 p-4 rounded-lg w-full space-y-2">
                    <h2 className="font-semibold text-lg text-primaryLight mb-3">Unlock Powerful PRO Features:</h2>
                    <p className="flex items-start"><span className="text-accent mr-2">⚡</span> Automate your savings & bill payments.</p>
                    <p className="flex items-start"><span className="text-accent mr-2">🧠</span> Get AI-powered advice from Quantum Advisor.</p>
                    <p className="flex items-start"><span className="text-accent mr-2">👥</span> Join exclusive financial communities.</p>
                </div>

                <p className="mt-8 text-gray-400 text-sm">Redirecting to your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="p-6 flex flex-col h-full bg-backgroundDark text-white">
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                <h1 className="text-2xl font-bold text-white">Tell us about yourself</h1>
                <p className="text-gray-300 mt-2 mb-8">This information helps us keep your account secure.</p>
                
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., John Kagame"
                            className="mt-1 block w-full px-3 py-2 bg-cardGlass border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="nationalId" className="block text-sm font-medium text-gray-300">Rwandan National ID</label>
                        <input
                            type="text"
                            id="nationalId"
                            value={nationalId}
                            onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                            maxLength={16}
                            placeholder="1 1990 8 1234567 0 12"
                            className="mt-1 block w-full px-3 py-2 bg-cardGlass border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-white"
                            required
                        />
                    </div>
                </div>

                {(formError || storeError) && <p className="mt-4 text-sm text-error">{formError || storeError}</p>}
                
                <div className="flex-grow" />
                <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primaryDark disabled:bg-primary/50">
                    {isLoading ? 'Creating Account...' : 'Complete Setup'}
                </button>
            </form>
        </div>
    );
};

export default KycScreen;