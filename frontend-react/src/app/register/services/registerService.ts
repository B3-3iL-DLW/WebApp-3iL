// src/app/register/services/classgroupService.ts

import {apiRequest} from '../../api/apiService';

export async function register(user: {
    email: string,
    password: string;
    firstname: string;
    lastname: string;
    classGroupId: number,
}) {
    try {
        const userWithRole = {
            ...user,
            role: 'STUDENT' // Set default role to 'student'
        };
        return await apiRequest('users', 'POST', userWithRole);
    } catch (error: any) {
        return Promise.reject(error);
    }
}