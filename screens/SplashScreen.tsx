import React from 'react';
import { ShieldCheck } from 'lucide-react';

const SplashScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-primary text-white">
            <div className="text-center animate-pulse">
                <ShieldCheck className="mx-auto h-24 w-24 text-white" />
                <h1 className="text-4xl font-black mt-4">SMART PAY</h1>
                <h2 className="text-2xl font-light text-primaryLight">RWANDA PRO</h2>
                <p className="mt-8 text-lg">Your Future, Secured.</p>
            </div>
            <div className="absolute bottom-8 text-sm text-gray-200">
                Loading Secure Environment...
            </div>
        </div>
    );
};

export default SplashScreen;
