import React, { useState } from 'react';
// FIX: Add .ts extension to file path
import { useUserStore } from '../../hooks/useUserStore.ts';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const { login, error } = useUserStore();
    const [phone, setPhone] = useState('250788123456'); // Pre-fill for demo
    const [pin, setPin] = useState('123456'); // Pre-fill for demo
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login({ phone, pin });
            // On success, App.tsx will handle navigation to the dashboard
        } catch (err) {
            // Error is handled globally in useUserStore
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 flex flex-col h-full bg-backgroundDark text-white">
            <button onClick={() => navigate('/auth/welcome')} className="mb-8 text-white self-start">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <form onSubmit={handleLogin} className="flex-grow flex flex-col">
                <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                <p className="text-gray-300 mt-2 mb-8">Log in to your account.</p>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-cardGlass border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="pin" className="block text-sm font-medium text-gray-300">6-digit PIN</label>
                        <input
                            type="password"
                            id="pin"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            maxLength={6}
                            className="mt-1 block w-full text-center tracking-[1em] px-3 py-2 bg-cardGlass border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-white"
                            required
                        />
                    </div>
                </div>

                {error && <p className="mt-4 text-sm text-error text-center">{error}</p>}

                <div className="flex-grow" />
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primaryDark flex items-center justify-center disabled:bg-primary/50"
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Log In'}
                </button>
                 <p className="text-center text-sm text-gray-400 mt-4">
                    Don't have an account?{' '}
                    <Link to="/auth/register" className="font-semibold text-primary hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginScreen;