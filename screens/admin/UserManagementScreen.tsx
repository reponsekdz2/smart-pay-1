
import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';

const UserManagementScreen: React.FC = () => {
    return (
        <div>
            <Header title="User Management" />
            <main className="p-4">
                <Card>
                    <p>This is a placeholder for user management. Admins would view, edit, or manage users here.</p>
                </Card>
            </main>
        </div>
    );
};

export default UserManagementScreen;
