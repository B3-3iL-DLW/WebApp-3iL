// src/app/auth/useCurrentUser.ts
import {useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import {User} from '../models/user';
import {getUser} from "@/app/users/userService";

const useCurrentUser = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const jwt = document.cookie
            .split('; ')
            .find(row => row.startsWith('jwt'))
            ?.split('=')[1];

        if (jwt) {
            const decodedJwt: any = jwtDecode(jwt);
            const userId = decodedJwt.sub;

            const fetchUser = async () => {
                const user = await getUser(userId);
                setUser(user);
            };

            fetchUser().then(r => r);
        }
    }, []);

    return user;
};

export default useCurrentUser;