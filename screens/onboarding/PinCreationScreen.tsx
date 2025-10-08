import React, { useState, useEffect } from 'react';
import { Delete } from 'lucide-react';

interface PinCreationScreenProps {
    onNext: (pin: string) => void;
}

const PinDot: React.FC<{ isActive: boolean }> = ({ isActive }) => (
    <div className={`w-4 h-4 rounded-full transition-colors ${isActive ? 'bg-primary' : 'bg-gray-600'}`}></div>
);

const KeypadButton: React.FC<{ value: string; onClick: (value: string) => void; children?: React.ReactNode }> = ({ value, onClick, children }) => (
    <button onClick={() => onClick(value)} className="text-3xl font-semibold text-white h-20 w-20 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
        {children || value}
    </button>
);

const PinCreationScreen: React.FC<PinCreationScreenProps> = ({ onNext }) => {
    const [step, setStep] = useState(1); // 1 for create, 2 for confirm
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (step === 1 && pin.length === 6) {
            setTimeout(() => setStep(2), 200);
        }
        if (step === 2 && confirmPin.length === 6) {
            if (pin === confirmPin) {
                onNext(pin);
            } else {
                setError('PINs do not match. Please start over.');
                setTimeout(() => {
                    setPin('');
                    setConfirmPin('');
                    setError('');
                    setStep(1);
                }, 1500);
            }
        }
    }, [pin, confirmPin, step, onNext]);

    const handleKeyPress = (value: string) => {
        if (value === 'del') {
            if (step === 1) setPin(p => p.slice(0, -1));
            else setConfirmPin(p => p.slice(0, -1));
            return;
        }
        if (step === 1 && pin.length < 6) setPin(p => p + value);
        if (step === 2 && confirmPin.length < 6) setConfirmPin(p => p + value);
    };

    const currentPin = step === 1 ? pin : confirmPin;
    const message = error || 'For your security, do not use guessable numbers.';

    return (
        <div className="flex flex-col h-full p-6 text-center bg-backgroundDark text-white">
             <h1 className="text-2xl font-bold text-white">
                {step === 1 ? 'Create a 6-digit PIN' : 'Confirm your PIN'}
            </h1>
            <p className={`mt-2 h-10 ${error ? 'text-error' : 'text-gray-300'}`}>{message}</p>
            
            <div className="flex justify-center items-center space-x-4 my-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <PinDot key={i} isActive={i < currentPin.length} />
                ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mx-auto">
                <KeypadButton value="1" onClick={handleKeyPress} />
                <KeypadButton value="2" onClick={handleKeyPress} />
                <KeypadButton value="3" onClick={handleKeyPress} />
                <KeypadButton value="4" onClick={handleKeyPress} />
                <KeypadButton value="5" onClick={handleKeyPress} />
                <KeypadButton value="6" onClick={handleKeyPress} />
                <KeypadButton value="7" onClick={handleKeyPress} />
                <KeypadButton value="8" onClick={handleKeyPress} />
                <KeypadButton value="9" onClick={handleKeyPress} />
                <div/>
                <KeypadButton value="0" onClick={handleKeyPress} />
                <KeypadButton value="del" onClick={handleKeyPress}>
                    <Delete className="w-8 h-8"/>
                </KeypadButton>
            </div>
        </div>
    );
};

export default PinCreationScreen;
