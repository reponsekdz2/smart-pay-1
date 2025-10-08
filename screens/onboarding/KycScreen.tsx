
import React, { useState } from 'react';
// FIX: Add .ts extension to file paths
import { useUserStore } from '../../hooks/useUserStore.ts';
import type { RegisterDto } from '../../types.ts';

interface KycScreenProps {
    regData: Partial<RegisterDto>;
    onNext: () => void;
}

const KycScreen: React.FC<KycScreenProps> = ({ regData, onNext }) => {
    const { register, error } = useUserStore();
    const [name, setName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            alert('Registration Successful! Please log in.');
            onNext(); // Navigate to login
        } catch (e) {
            // Error is handled in the store, but we can also set local form error
            setFormError(error || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

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

                {(formError || error) && <p className="mt-4 text-sm text-error">{formError || error}</p>}
                
                <div className="flex-grow" />
                <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primaryDark disabled:bg-primary/50">
                    {isLoading ? 'Creating Account...' : 'Complete Setup'}
                </button>
            </form>
        </div>
    );
};

export default KycScreen;
