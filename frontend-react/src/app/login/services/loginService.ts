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
    const response = await apiRequest('auth/login', 'POST', credentials);
    if (!response.ok) {
        throw new InvalidCredentialsError('Invalid credentials');
    }
    const {access_token} = response.data;
    return access_token;
}