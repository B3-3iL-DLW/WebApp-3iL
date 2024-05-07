// src/app/users/userService.ts

import {User} from '../models/user';
import {apiRequest} from '../api/apiService';

export async function getUser(id: number): Promise<User> {
    const user = await apiRequest(`users/${id}`, 'GET');

    return user.data as User;
}