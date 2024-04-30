// src/app/pages/UserPage.tsx

import React from 'react';
import {useUser} from '../users/useUser';

const UserPage = () => {
    const user = useUser(1);

    return (
        <div>
            {user && (
                <div>
                    <h1>{user.firstname} {user.lastname}</h1>
                    <p>{user.email}</p>
                </div>
            )}
        </div>
    );
};

export default UserPage;