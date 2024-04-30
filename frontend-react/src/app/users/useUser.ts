// src/app/users/useUser.ts

import {useEffect, useState} from 'react';
import {User} from '../models/user';
import {getUser} from './userService';

export const useUser = (id: number) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(id);
            setUser(user);
        };

        fetchUser();
    }, [id]);

    return user;
};