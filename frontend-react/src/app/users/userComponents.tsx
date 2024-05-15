// src/app/users/UserComponent.tsx
"use client";
import React, {useEffect, useState} from 'react';
import {getUser, verifySession} from "@/app/lib/dal";

import {User} from "@/app/models/user";


export default function UserComponent() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        verifySession().then(session => {
            if (session) {
                getUser().then(fetchedUser => {
                    setUser(fetchedUser);
                });
            }
        });
    }, []);

    return (
        <div>
            {user && (
                <div>
                    <h1>{user.firstname} {user.lastname}</h1>
                    <p>{user.email}</p>
                    <p>{user.classGroupId}</p>
                </div>
            )}
        </div>
    );
};
