// src/app/register/services/registerService.ts

import {apiRequest} from '../../api/apiService';

export async function register(user: {
    email: string,
    password: string;
    firstname: string;
    lastname: string;
    classGroupId: number,
}) {
    const userWithRole = {
        ...user,
        role: 'STUDENT' // Set default role to 'student'
    };
    try {
        return await apiRequest('users', 'POST', userWithRole);
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}