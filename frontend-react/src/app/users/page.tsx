// src/app/pages/UserPage.tsx
"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import {getUser} from '../lib/dal';
import UserTable from "@/app/users/userTable";

const UserComponent = dynamic(() => import('../users/userComponents'), { ssr: false });

// This is a new client component that fetches the user's role
const UserRoleComponent = () => {
    const [role, setRole] = React.useState<string | null>(null);

    React.useEffect(() => {
        getUser().then(user => {
            if (user) {
                console.log(user.role)
                setRole(user.role);
            }
        });
    }, []);

    return (
        <>
            {role === 'ADMIN' ? <UserTable /> : <UserComponent />}
        </>
    );
};

const UserPage = () => {
    return <UserRoleComponent />;
};

export default UserPage;