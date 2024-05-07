// src/app/users/UserComponent.tsx
"use client";
import React from 'react';
import useCurrentUser from "@/app/auth/useCurrentUser";

const UserComponent = () => {
    const user = useCurrentUser();

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