import React from 'react';
import Header from '../components/Header';
import { ArrowLeft, ShieldCheck, Fingerprint, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SecurityFeature: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="border-l-4 border-primary pl-4">
        <h3 className="font-bold text-textPrimary dark:text-white">{title}</h3>
        <p className="text-sm text-textSecondary dark:text-gray-400">{description}</p>
    </div>
);

const SecurityScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Security Suite" leftAction={<button onClick={() => navigate(-1)}><ArrowLeft/></button>} />
            <div className="p-4 space-y-8">
                <div className="text-center p-4 bg-surface dark:bg-gray-800 rounded-lg">
                    <ShieldCheck className="w-16 h-16 text-success mx-auto" />
                    <h1 className="text-2xl font-bold text-textPrimary dark:text-white mt-2">Your Future, Secured</h1>
                    <p className="text-textSecondary dark:text-gray-400 mt-1">We employ next-generation, multi-layered security to protect your assets and data.</p>
                </div>
               
                <div>
                     <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-4 flex items-center">
                        <ShieldCheck className="w-6 h-6 mr-2 text-primary"/>
                        Quantum Encryption Security
                    </h2>
                    <div className="space-y-4">
                        <SecurityFeature
                            title="Post-Quantum Cryptography"
                            description="Our systems use lattice-based cryptography, making them resistant to attacks from future quantum computers."
                        />
                         <SecurityFeature
                            title="Homomorphic Encryption"
                            description="We can perform calculations on your financial data while it remains fully encrypted, ensuring ultimate privacy."
                        />
                    </div>
                </div>

                 <div>
                     <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-4 flex items-center">
                        <Fingerprint className="w-6 h-6 mr-2 text-primary"/>
                        Advanced Behavioral Biometrics
                    </h2>
                    <div className="space-y-4">
                        <SecurityFeature
                            title="Gait Analysis"
                            description="Continuous authentication based on your unique walking pattern, detected by your phone's sensors."
                        />
                         <SecurityFeature
                            title="Cognitive Biometrics"
                            description="Identifies you based on your unique decision-making and problem-solving patterns within the app."
                        />
                    </div>
                </div>

                 <div>
                     <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-4 flex items-center">
                        <Bot className="w-6 h-6 mr-2 text-primary"/>
                        AI-Powered Cyber Defense
                    </h2>
                    <div className="space-y-4">
                        <SecurityFeature
                            title="Predictive Threat Hunting"
                            description="Our AI predicts and neutralizes zero-day attacks before they happen, offering proactive protection."
                        />
                         <SecurityFeature
                            title="Decentralized Identity (DID)"
                            description="You own your identity. We use self-sovereign identity protocols, giving you full control over your personal data."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityScreen;