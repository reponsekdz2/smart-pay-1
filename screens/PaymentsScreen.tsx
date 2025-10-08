import React from 'react';
import Header from '../components/Header';
import { Send, QrCode, Users, Calendar, Link as LinkIcon, FileText, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureButton: React.FC<{ icon: React.ElementType, title: string, subtitle: string, to?: string }> = ({ icon: Icon, title, subtitle, to }) => {
    const content = (
        <div className="flex items-center w-full p-4 bg-surface rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <div className="p-3 bg-primaryLight text-primary rounded-lg mr-4">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-left font-semibold text-textPrimary">{title}</h3>
                <p className="text-left text-sm text-textSecondary">{subtitle}</p>
            </div>
        </div>
    );
    
    return to ? <Link to={to}>{content}</Link> : <button className="w-full">{content}</button>;
};


const PaymentsScreen: React.FC = () => {
    return (
        <div className="bg-background min-h-full">
            <Header title="Payments" />
            <div className="p-4 space-y-4">
                <FeatureButton to="/top-up" icon={Wallet} title="Top Up Wallet" subtitle="Add money from MTN, Banks, or Cards" />
                <FeatureButton to="/send-money" icon={Send} title="Send Money" subtitle="To phone, bank, or QR code" />
                <FeatureButton icon={QrCode} title="Scan to Pay" subtitle="Use your camera to pay merchants" />
                <FeatureButton icon={Users} title="Split Bills" subtitle="Share expenses with friends" />
                <FeatureButton icon={Calendar} title="Scheduled Payments" subtitle="Automate your future transfers" />
                <FeatureButton icon={LinkIcon} title="Payment Links" subtitle="Generate a link to get paid" />
                <FeatureButton icon={FileText} title="Business Invoices" subtitle="Create and send professional invoices" />
            </div>
        </div>
    );
};

export default PaymentsScreen;