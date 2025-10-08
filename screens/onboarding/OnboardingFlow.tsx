import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import PhoneVerificationScreen from './PhoneVerificationScreen';
import PinCreationScreen from './PinCreationScreen';
import KycScreen from './KycScreen';
import { useUserStore } from '../../hooks/useUserStore';

const OnboardingFlow: React.FC = () => {
    const [step, setStep] = useState('welcome');
    const { setPhone, setName, setPin, completeOnboarding } = useUserStore();

    const handleWelcomeNext = () => setStep('phone');
    
    const handlePhoneVerified = (phone: string) => {
        setPhone(phone);
        setStep('pin');
    };

    const handlePinSet = (pin: string) => {
        setPin(pin);
        setStep('kyc');
    };
    
    const handleKycCompleted = (name: string) => {
        setName(name);
        completeOnboarding();
        // The App component will automatically navigate to dashboard
    };

    switch (step) {
        case 'welcome':
            return <WelcomeScreen onNext={handleWelcomeNext} />;
        case 'phone':
            return <PhoneVerificationScreen onVerified={handlePhoneVerified} />;
        case 'pin':
            return <PinCreationScreen onPinSet={handlePinSet} />;
        case 'kyc':
            return <KycScreen onCompleted={handleKycCompleted} />;
        default:
            return <WelcomeScreen onNext={handleWelcomeNext} />;
    }
};

export default OnboardingFlow;
