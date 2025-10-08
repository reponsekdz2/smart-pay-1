import React from 'react';

interface HeaderProps {
    title: string;
    leftAction?: React.ReactNode;
    rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, leftAction, rightAction }) => {
    return (
        <header className="sticky top-0 bg-surface dark:bg-gray-800 z-10 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between text-textPrimary dark:text-white h-16">
            <div className="w-10">{leftAction}</div>
            <h1 className="text-lg font-bold text-center absolute left-1/2 -translate-x-1/2">{title}</h1>
            <div className="w-10">{rightAction}</div>
        </header>
    );
};

export default Header;
