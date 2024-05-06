// src/app/register/services/classgroupService.ts

import {apiRequest} from '../../api/apiService';

export async function getClassGroups() {
    try {
        return await apiRequest('classgroups', 'GET');
    } catch (error: any) {
        throw new Error('Failed to get class groups');
    }
}