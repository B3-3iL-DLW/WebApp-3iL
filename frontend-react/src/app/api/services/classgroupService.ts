// src/app/register/services/classgroupService.ts

import {apiRequest} from '../apiService';
import {Classgroup} from "@/app/models/classgroup";

export async function getClassGroups() {
    try {
        return await apiRequest('classgroups', 'GET');
    } catch (error: any) {
        throw new Error('Failed to get class groups');
    }
}

export async function getClassGroupById(id: number | undefined): Promise<Classgroup>{
    console.log(id);

    try {
        let response = await apiRequest(`classgroups/${id}`, 'GET');
        return response.data;
    } catch (error: any) {
        throw new Error('Failed to get class groups');
    }
}