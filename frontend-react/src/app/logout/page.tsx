// src/app/logout/LogoutHandler.tsx
"use client"
import React from 'react';
import { logout } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function LogoutHandler() {
    const router = useRouter();

    React.useEffect(() => {
        logout().then(() => {
            router.push('/login')
        });
    }, [router]);

    return <div>Dé-connexion...</div>;
}