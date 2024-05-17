// src/app/api/apiService.ts
import {API_BASE_URL} from './apiConfig';
import {verifySession} from "@/app/lib/dal";

export interface ApiResponse {
    ok: boolean;
    status: number;
    data: any;

}

export async function apiRequest(endpoint: string, method: string, body?: any): Promise<ApiResponse> {
    const session = await verifySession()
    const bearer = session?.session

    let headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (bearer) {
        headers['Authorization'] = `Bearer ${bearer}`;
    }

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    const data = await response.text().then(text => {
        try {
            // Try to parse the text as JSON
            return JSON.parse(text);
        } catch {
            // If it fails, return the raw text
            return text;
        }
    });

    if (!response.ok) {
        return {
            ok: false,
            status: response.status,
            data,
        };
    }

    return {
        ok: true,
        status: response.status,
        data,
    };
}