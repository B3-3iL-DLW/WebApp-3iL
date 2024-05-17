"use client";
import { useEffect } from 'react';
import { verifySession } from '@/app/lib/dal';
import {redirect} from "next/navigation";

export default function HomePage() {

    useEffect(() => {
        const checkSession = async () => {
            const session = await verifySession();
            if (!session) {
                console.log('No session');
            } else {
                redirect('/users')
            }
        };
        checkSession().then(r => r);
    }, []);

    return <div>Loading...</div>;
}