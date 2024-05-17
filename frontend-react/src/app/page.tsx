"use client";
import { useEffect } from 'react';
import { verifySession } from '@/app/lib/dal';
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const session = await verifySession();
            if (!session) {
                console.log('No session');
            } else {
                router.push('/users')
            }
        };
        checkSession().then(r => r);
    });

    return <div>Loading...</div>;
}