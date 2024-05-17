// src/app/users/UserComponent.tsx
"use client";
import React, {useEffect, useState} from 'react';
import {getUser, verifySession} from "@/app/lib/dal";
import {User} from "@/app/models/user";
import {Classgroup} from "@/app/models/classgroup";
import {getClassGroupById} from "@/app/api/services/classgroupService";
import {Button, Card, CardBody, CardHeader, Image, Input, Spacer} from "@nextui-org/react";
import {apiRequest} from '../api/apiService';

export default function UserComponent() {
    const [user, setUser] = useState<User | null>(null);
    const [classgroup, setClassgroup] = useState<Classgroup>();
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState("");

    const fetchData = async () => {
        const session = await verifySession();
        if (session) {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
            setEmail(fetchedUser.email);
            setFirstname(fetchedUser.firstname);
            setLastname(fetchedUser.lastname);
            if (fetchedUser.classGroupId) {
                const fetchedClassgroup = await getClassGroupById(fetchedUser.classGroupId);
                setClassgroup(fetchedClassgroup);
            }
        }
    };

    useEffect(() => {
        fetchData().then(r => r);
    }, []);

    const handleEdit = async () => {
        if (user) {
            const response = await apiRequest(`users/${user.id}`, 'PATCH', {id: user.id, email, firstname, lastname});
            if (response.ok) {
                await fetchData();
                setEditMode(false);
                setError(""); // clear any previous error
            } else if (response.status === 409) {
                setError("Email already in use");
            }
        }
    };

    return (
        <div className="flex items-center justify-center pt-20">
            {user && classgroup && (
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <Image src="/3il_logos_groupe.png" alt="Logo" width={200} height={200}/>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <h4 className="font-bold text-large">{user.firstname} {user.lastname}</h4>
                        {editMode ? (
                            <>
                                <Spacer y={8}/>
                                <Input label="First Name" value={firstname}
                                       onChange={e => setFirstname(e.target.value)}/>
                                <Spacer y={8}/>
                                <Input label="Last Name" value={lastname} onChange={e => setLastname(e.target.value)}/>
                                <Spacer y={8}/>
                                <Input label="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                                <Spacer y={8}/>
                                <Button onClick={handleEdit}>Save</Button>
                            </>
                        ) : (
                            <>
                                <p className="text-default-500">{user.email}</p>
                                <p className="text-tiny uppercase font-bold">{classgroup.name}</p>
                                <Spacer y={8}/>
                                <Button onClick={() => setEditMode(true)}>Modifier</Button>
                            </>
                        )}
                        {error && <p className="error">{error}</p>}
                    </CardBody>
                </Card>
            )}
        </div>
    );
};