// src/app/pages/UserPage.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import RootLayout from '../layout'; // Import the RootLayout component

const UsersList = dynamic(() => import('../users/UserList'), { ssr: false });

const UserPage = () => {
    return (
        <RootLayout> {/* Use the RootLayout component to wrap your page content */}
            <UsersList />
        </RootLayout>
    );
};

export default UserPage;