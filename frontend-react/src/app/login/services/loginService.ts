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
    console.log('Sending login request with credentials:', credentials);
    const response = await apiRequest('auth/login', 'POST', credentials);
    console.log('Received response:', response);
    if (!response.ok) {
        console.log('Login request failed with status:', response.status);
        throw new InvalidCredentialsError('Invalid credentials');
    }
    const {access_token} = response.data;
    console.log('Received token:', access_token);
    return access_token;
}