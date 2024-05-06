// src/app/login/services/loginService.ts

import {apiRequest} from '../../api/apiService';

export class InvalidCredentialsError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'InvalidCredentialsError';
    }
}

export interface Credentials {
    email: string;
    password: string;
}


export async function login(credentials: Credentials) {
    try {
        const {access_token} = await apiRequest('auth/login', 'POST', credentials);
        return access_token;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            throw new InvalidCredentialsError('Invalid credentials');
        } else {
            throw new Error('Failed to log in');
        }
    }
}