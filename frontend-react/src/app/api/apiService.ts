// src/app/api/apiService.ts

import { API_BASE_URL } from './apiConfig';

export async function apiRequest(endpoint: string, method: string, body?: any) {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        throw new Error('Failed to make API request');
    }

    return await response.json();
}