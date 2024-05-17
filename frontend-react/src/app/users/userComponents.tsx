// src/app/users/UserComponent.tsx
"use client";
import React, {useEffect, useState} from 'react';
import {getUser, verifySession} from "@/app/lib/dal";

import {User} from "@/app/models/user";
import {Classgroup} from "@/app/models/classgroup";
import {getClassGroupById} from "@/app/api/services/classgroupService";

export default function UserComponent() {
    const [user, setUser] = useState<User | null>(null);
    const [classgroup, setClassgroup] = useState<Classgroup>();

    useEffect(() => {
        verifySession().then(session => {
            if (session) {
                getUser().then(fetchedUser => {
                    setUser(fetchedUser);
                    if (fetchedUser.classGroupId) {
                        getClassGroupById(fetchedUser.classGroupId).then(fetchedClassgroup => {
                            setClassgroup(fetchedClassgroup);
                        });
                    }
                });
            }
        });
    }, []);

    return (
        <div>
            {user && classgroup && (
                <div className="flex items-center justify-center min-h-screen">
                    <h1>{user.firstname} {user.lastname}</h1>
                    <p>{user.email}</p>
                    <p>{classgroup.name}</p>
                </div>
            )}
        </div>
    );
};