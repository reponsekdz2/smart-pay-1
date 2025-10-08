
import React from 'react';

interface HeaderProps {
    title: string;
    leftAction?: React.ReactNode;
    rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, leftAction, rightAction }) => {
    return (
        <header className="sticky top-0 bg-surface z-10 p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="w-10">{leftAction}</div>
            <h1 className="text-lg font-bold text-textPrimary text-center">{title}</h1>
            <div className="w-10">{rightAction}</div>
        </header>
    );
};

export default Header;