// src/app/users/UserComponent.tsx
"use client";
import React from 'react';
import {useUser} from './useUser';

const UserComponent = () => {
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

export default UserComponent;