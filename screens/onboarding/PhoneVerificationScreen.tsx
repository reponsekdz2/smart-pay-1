import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface PhoneVerificationScreenProps {
    onNext: (phone: string) => void;
}

const PhoneVerificationScreen: React.FC<PhoneVerificationScreenProps> = ({ onNext }) => {
    const [step, setStep] = useState(1); // 1 for phone, 2 for OTP
    const [phone, setPhone] = useState('25078');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length < 12) {
            setError('Please enter a valid Rwandan phone number.');
            return;
        }
        setError('');
        setStep(2);
    };
    
    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp === '123456') { // Simulate correct OTP
            setError('');
            onNext(phone);
        } else {
            setError('Invalid verification code. Please try again.');
        }
    };
    
    return (
        <div className="p-6 flex flex-col h-full bg-backgroundDark text-white">
            <button onClick={() => setStep(1)} className={`mb-8 text-white ${step === 1 ? 'invisible' : ''}`}>
                <ArrowLeft className="w-6 h-6" />
            </button>
            
            {step === 1 && (
                <form onSubmit={handlePhoneSubmit} className="flex-grow flex flex-col">
                    <h1 className="text-2xl font-bold text-white">What's your number?</h1>
                    <p className="text-gray-300 mt-2 mb-8">We'll text you a code to verify your phone.</p>
                    <div className="relative">
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
                            className="w-full pl-4 pr-3 py-3 bg-cardGlass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                            required
                        />
                    </div>
                     {error && <p className="mt-2 text-sm text-error">{error}</p>}
                    <div className="flex-grow" />
                    <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primaryDark">
                        Send Code
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleOtpSubmit} className="flex-grow flex flex-col">
                    <h1 className="text-2xl font-bold text-white">Enter your code</h1>
                    <p className="text-gray-300 mt-2 mb-8">We sent it to {phone}. (Hint: 123456)</p>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        maxLength={6}
                        className="w-full text-center text-2xl tracking-[0.5em] py-3 bg-cardGlass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                        required
                    />
                    {error && <p className="mt-2 text-sm text-error">{error}</p>}
                    <p className="text-center mt-4">
                        <button type="button" className="text-primary font-semibold">Resend code</button>
                    </p>
                    <div className="flex-grow" />
                    <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primaryDark">
                        Verify
                    </button>
                </form>
            )}
        </div>
    );
};

export default PhoneVerificationScreen;
