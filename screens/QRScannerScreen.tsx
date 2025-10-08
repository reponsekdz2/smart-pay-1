
import React from 'react';
import Header from '../components/Header';
import { ArrowLeft, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const QRScannerScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background min-h-full flex flex-col">
            <Header
                title="Scan to Pay"
                leftAction={<button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>}
            />
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                 <Card>
                    <QrCode className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-textPrimary dark:text-white">QR Payments</h2>
                    <p className="text-textSecondary dark:text-gray-400 mt-2">
                        This feature is under development. In a real app, this screen would activate the camera to scan QR codes for quick payments.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default QRScannerScreen;
