// src/app/pages/UserPage.tsx

import React from 'react';
import dynamic from 'next/dynamic';

const UserComponent = dynamic(() => import('../users/userComponents'), { ssr: false });

const UserPage = () => {
    return (
        <div>
            <UserComponent />
        </div>
    );
};

export default UserPage;