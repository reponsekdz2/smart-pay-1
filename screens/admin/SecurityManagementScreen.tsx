
import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';

const SecurityManagementScreen: React.FC = () => {
    return (
        <div>
            <Header title="Security Management" />
            <main className="p-4">
                <Card>
                    <p>This is a placeholder for security management. Admins would review flagged transactions and manage security rules here.</p>
                </Card>
            </main>
        </div>
    );
};

export default SecurityManagementScreen;
