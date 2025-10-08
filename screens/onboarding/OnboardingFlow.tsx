import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import PhoneVerificationScreen from './PhoneVerificationScreen';
import PinCreationScreen from './PinCreationScreen';
import KycScreen from './KycScreen';
import LoginScreen from './LoginScreen';
import { useUserStore } from '../../hooks/useUserStore';
import type { RegisterData } from '../../types';

const OnboardingFlow: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { register } = useUserStore();
    const [registrationData, setRegistrationData] = useState<Partial<RegisterData>>({});

    // This effect ensures that the user always starts at the welcome screen
    // when they enter the onboarding flow.
    useEffect(() => {
        if (location.pathname === '/onboarding' || location.pathname === '/onboarding/') {
            // Already at the start, do nothing.
        } else if (!location.pathname.startsWith('/onboarding/')) {
             navigate('/welcome', { replace: true });
        }
    }, [location.pathname, navigate]);


    const handlePhoneVerified = (phone: string) => {
        setRegistrationData(prev => ({ ...prev, phone }));
        navigate('pin');
    };

    const handlePinSet = (pin: string) => {
        setRegistrationData(prev => ({ ...prev, pin }));
        navigate('kyc');
    };
    
    const handleKycCompleted = async (name: string, nationalId: string) => {
        const finalData = { ...registrationData, name, nationalId } as RegisterData;
        try {
            await register(finalData);
            // On success, the App component's effect will navigate to the dashboard
        } catch (error) {
            console.error("Registration failed:", error);
            // Here you would show an error message to the user
            navigate('/welcome'); // Go back to start on failure
        }
    };

    return (
        <Routes>
            <Route index element={<WelcomeScreen />} />
            <Route path="welcome" element={<WelcomeScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<PhoneVerificationScreen onVerified={handlePhoneVerified} />} />
            <Route path="pin" element={<PinCreationScreen onPinSet={handlePinSet} />} />
            <Route path="kyc" element={<KycScreen onCompleted={handleKycCompleted} />} />
        </Routes>
    );
};

export default OnboardingFlow;