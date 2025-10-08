import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import PhoneVerificationScreen from './PhoneVerificationScreen';
import PinCreationScreen from './PinCreationScreen';
import KycScreen from './KycScreen';
import LoginScreen from './LoginScreen';

const OnboardingFlow: React.FC = () => {
    return (
        <div className="max-w-md mx-auto h-screen bg-backgroundDark font-sans flex flex-col">
            <Routes>
                <Route path="welcome" element={<WelcomeScreen />} />
                <Route path="login" element={<LoginScreen />} />
                <Route path="register" element={<RegisterFlow />} />
                <Route path="*" element={<WelcomeScreen />} />
            </Routes>
        </div>
    );
};


// --- Multi-Step Registration Component ---
const RegisterFlow: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [regData, setRegData] = useState<any>({});

    const handleNext = (data: any) => {
        setRegData((prev: any) => ({ ...prev, ...data }));
        setStep(prev => prev + 1);
    }
    
    switch (step) {
        case 1:
            return <PhoneVerificationScreen onNext={(phone) => handleNext({ phone })} />;
        case 2:
            return <PinCreationScreen onNext={(pin) => handleNext({ pin })} />;
        case 3:
            return <KycScreen regData={regData} onNext={() => navigate('/auth/login', {replace: true})} />;
        default:
            return <PhoneVerificationScreen onNext={(phone) => handleNext({ phone })} />;
    }
}


export default OnboardingFlow;