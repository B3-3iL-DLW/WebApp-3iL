"use server";

import {cookies} from 'next/headers'
import {decrypt} from '@/app/lib/session'
import {redirect} from "next/navigation";
import {cache} from 'react';
import {apiRequest} from "@/app/api/apiService";

export const verifySession = cache(async () => {

    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.userId) {

        redirect('/login')
    }

    return { isAuth: true, userId: session.userId, session: cookie }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const data = await apiRequest(`users/${session.userId}`, 'GET')
        console.log(data.data)
        return data.data

    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})