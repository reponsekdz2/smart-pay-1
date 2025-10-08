import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Shield, User, ShoppingBasket, School, Zap, Globe, Cpu, Cuboid, HeartPulse, Landmark, Code } from 'lucide-react';

interface MoreLinkProps {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    to: string;
}

const MoreLink: React.FC<MoreLinkProps> = ({ icon: Icon, title, subtitle, to }) => (
    <Link to={to} className="flex items-center w-full p-4 bg-surface dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <div className="p-3 bg-primaryLight dark:bg-primary/20 text-primary dark:text-primaryLight rounded-lg mr-4">
            <Icon className="w-6 h-6" />
        </div>
        <div className="flex-grow">
            <h3 className="text-left font-semibold text-textPrimary dark:text-gray-100">{title}</h3>
            <p className="text-left text-sm text-textSecondary dark:text-gray-400">{subtitle}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
    </Link>
);


const MoreScreen: React.FC = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="More Options" />
            <div className="p-4 space-y-4">
                <h2 className="font-bold text-sm text-textSecondary dark:text-gray-400 px-2">FINANCIAL TOOLS</h2>
                <MoreLink 
                    to="/payments" 
                    icon={CreditCard} 
                    title="Payments" 
                    subtitle="Send, pay bills, and manage utilities"
                />
                 <MoreLink 
                    to="/remittance" 
                    icon={Globe} 
                    title="Global Remittance" 
                    subtitle="Instant, low-cost cross-border transfers"
                />
                <MoreLink 
                    to="/insurance" 
                    icon={Shield} 
                    title="Insurance Hub" 
                    subtitle="Manage policies and health services"
                />
                <MoreLink 
                    to="/automation" 
                    icon={Zap} 
                    title="Automation Engine" 
                    subtitle="Set smart rules for your money"
                />

                <h2 className="font-bold text-sm text-textSecondary dark:text-gray-400 px-2 mt-4">GROWTH & ECOSYSTEM</h2>
                 <MoreLink 
                    to="/marketplace" 
                    icon={ShoppingBasket} 
                    title="Local Marketplace" 
                    subtitle="Shop from local businesses"
                />
                <MoreLink 
                    to="/education" 
                    icon={School} 
                    title="Financial Education" 
                    subtitle="Learn and improve your skills"
                />
                <MoreLink 
                    to="/community" 
                    icon={User} 
                    title="Community Banking" 
                    subtitle="Join Ibimina and fund projects"
                />
                <MoreLink 
                    to="/civic" 
                    icon={Landmark} 
                    title="Civic Services" 
                    subtitle="Digital ID and government services"
                />

                <h2 className="font-bold text-sm text-textSecondary dark:text-gray-400 px-2 mt-4">NEXT-GENERATION FEATURES</h2>
                <MoreLink 
                    to="/advisor" 
                    icon={Cpu} 
                    title="Quantum AI Advisor" 
                    subtitle="Deep financial planning & analysis"
                />
                <MoreLink 
                    to="/metaverse" 
                    icon={Cuboid} 
                    title="Metaverse Banking" 
                    subtitle="Explore our virtual finance world"
                />
                 <MoreLink 
                    to="/wellness" 
                    icon={HeartPulse} 
                    title="Bio-Financial Wellness" 
                    subtitle="Connect your health and wealth"
                />
                
                <h2 className="font-bold text-sm text-textSecondary dark:text-gray-400 px-2 mt-4">ACCOUNT & DEVELOPERS</h2>
                 <MoreLink 
                    to="/profile" 
                    icon={User} 
                    title="My Profile" 
                    subtitle="Manage your account and settings"
                />
                <MoreLink 
                    to="/developer" 
                    icon={Code} 
                    title="Developer Platform" 
                    subtitle="APIs, no-code tools, and more"
                />
            </div>
        </div>
    );
};

export default MoreScreen;