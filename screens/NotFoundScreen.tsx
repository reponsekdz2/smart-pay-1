import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <AlertTriangle className="w-24 h-24 text-warning mb-4" />
            <h1 className="text-4xl font-bold text-textPrimary dark:text-white">404</h1>
            <h2 className="text-2xl font-semibold text-textPrimary dark:text-white mt-2">Page Not Found</h2>
            <p className="text-textSecondary dark:text-gray-400 mt-2">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link to="/" className="mt-6 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primaryDark transition-colors">
                Go to Dashboard
            </Link>
        </div>
    );
};

export default NotFoundScreen;
