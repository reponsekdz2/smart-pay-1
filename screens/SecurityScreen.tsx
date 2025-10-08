
import React from 'react';
import Header from '../components/Header';
import { ArrowLeft, Fingerprint, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const SecurityScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header
                title="Security Center"
                leftAction={<button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>}
            />
            <main className="p-4 space-y-4">
                <Card>
                    <div className="flex items-center">
                        <ShieldCheck className="w-10 h-10 text-success mr-4" />
                        <div>
                            <h2 className="font-bold text-textPrimary dark:text-white">Account Secured</h2>
                            <p className="text-sm text-textSecondary dark:text-gray-400">Your account is protected with bank-level security.</p>
                        </div>
                    </div>
                </Card>
                 <Card>
                    <h2 className="text-lg font-semibold mb-2 text-textPrimary dark:text-white">Security Settings</h2>
                    <div className="space-y-3">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Fingerprint className="w-5 h-5 text-textSecondary dark:text-gray-400 mr-3" />
                                <span className="text-textPrimary dark:text-gray-200">Biometric Login</span>
                            </div>
                            <p className="text-sm font-semibold text-primary">Enabled</p>
                        </div>
                         <button className="w-full text-left mt-4 text-primary font-semibold">
                           Change PIN
                        </button>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default SecurityScreen;
