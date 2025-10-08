
import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';

const TransactionManagementScreen: React.FC = () => {
    return (
        <div>
            <Header title="Transaction Management" />
            <main className="p-4">
                <Card>
                    <p>This is a placeholder for transaction management. Admins would view, search, and manage transactions here.</p>
                </Card>
            </main>
        </div>
    );
};

export default TransactionManagementScreen;
