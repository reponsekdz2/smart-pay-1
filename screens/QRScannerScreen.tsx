import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Scan } from 'lucide-react';

const QRScannerScreen: React.FC = () => {
    const navigate = useNavigate();
    const [isScanning, setIsScanning] = useState(false);

    const handleSimulateScan = () => {
        setIsScanning(true);
        // Simulate scanning delay
        setTimeout(() => {
            // In a real app, this data would come from a QR code scanning library
            const scannedData = {
                recipient: 'Kigali Cafe',
                amount: 5500
            };
            navigate('/send-money', { state: scannedData });
        }, 1500);
    };

    return (
        <div className="w-full h-screen bg-black text-white flex flex-col">
            <header className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between bg-black/30">
                <button onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold">Scan to Pay</h1>
                <div className="w-6"></div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center relative">
                {/* This would be replaced by a live camera feed */}
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Camera className="w-24 h-24 text-gray-600" />
                </div>

                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-4 border-white/50 rounded-lg relative overflow-hidden">
                         {isScanning && (
                            <div className="absolute top-0 w-full h-1 bg-primary animate-[scan_1.5s_ease-in-out_infinite]"></div>
                        )}
                    </div>
                </div>

                 <style>{`
                    @keyframes scan {
                        0% { transform: translateY(-10px); }
                        100% { transform: translateY(256px); }
                    }
                `}</style>
                
            </main>

            <footer className="p-6 text-center bg-black/30">
                <p className="mb-4">Position a QR code within the frame</p>
                <button 
                    onClick={handleSimulateScan}
                    disabled={isScanning}
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full flex items-center justify-center mx-auto hover:bg-primaryDark disabled:bg-gray-500 transition-colors"
                >
                    <Scan className="w-5 h-5 mr-2" />
                    {isScanning ? 'Scanning...' : 'Simulate Scan'}
                </button>
            </footer>
        </div>
    );
};

export default QRScannerScreen;