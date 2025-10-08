import React from 'react';
import { ShieldCheck, Users, BarChartBig, Rocket, Shield, Star, Lock, CheckCircle } from 'lucide-react';

interface WelcomeScreenProps {
    onNext: () => void;
}

const StatItem: React.FC<{ icon: React.ElementType; value: string; label: string }> = ({ icon: Icon, value, label }) => (
    <div className="flex flex-col items-center">
        <Icon className="w-8 h-8 text-accent mb-2" />
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-gray-300">{label}</p>
    </div>
);

const FeatureCard: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({ icon: Icon, title, description }) => (
    <div className="bg-cardGlass p-6 rounded-xl border border-white/10 text-center">
        <Icon className="w-10 h-10 text-primaryLight mx-auto mb-4" />
        <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ name: string; role: string; text: string; }> = ({ name, role, text }) => (
    <div className="bg-cardGlass p-6 rounded-xl border border-white/10">
        <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
        </div>
        <p className="text-white italic mb-4">"{text}"</p>
        <p className="font-bold text-white">{name}, <span className="font-normal text-gray-400">{role}</span></p>
    </div>
);


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
    return (
        <div className="flex flex-col h-full bg-backgroundDark text-white overflow-y-auto">
            <div className="flex-grow p-6 space-y-12">
                {/* Hero Section */}
                <div className="text-center pt-8">
                    <ShieldCheck className="h-20 w-20 text-primaryLight mx-auto" />
                    <h1 className="text-4xl font-extrabold text-white mt-4">Smart Pay Rwanda PRO</h1>
                    <p className="text-lg text-gray-300 mt-2">Your Financial Future, Empowered.</p>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <StatItem icon={Users} value="1.2M+" label="Active Users" />
                    <StatItem icon={BarChartBig} value="45B+" label="RWF Processed" />
                    <StatItem icon={Star} value="4.9" label="App Rating" />
                </div>

                {/* Feature Showcase */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-center">Why Choose Smart Pay?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FeatureCard icon={Rocket} title="Instant Transfers" description="Send money anywhere in Rwanda in seconds." />
                        <FeatureCard icon={Shield} title="Bank-Grade Security" description="Military-level encryption for your money." />
                    </div>
                </div>

                {/* Social Proof */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-center">What Our Users Say</h2>
                     <TestimonialCard 
                        name="Marie U."
                        role="Small Business Owner"
                        text="Smart Pay transformed my business. Payments are instant!"
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div className="p-6 bg-black/20 sticky bottom-0">
                <h2 className="text-xl font-bold text-center">Ready to Transform Your Financial Life?</h2>
                <p className="text-gray-300 text-center mt-1 mb-6">Join over 1 million Rwandans who trust Smart Pay.</p>
                <button 
                    onClick={onNext}
                    className="w-full bg-primary text-white font-bold py-4 px-4 rounded-lg hover:bg-primaryDark transition-transform transform hover:scale-105"
                >
                    Get Started - It's Free!
                </button>
                <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-400">
                    <span className="flex items-center"><Lock className="w-3 h-3 mr-1"/> Bank-Level Security</span>
                    <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> BNR Regulated</span>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;