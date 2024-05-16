// src/app/users/UsersList.tsx
"use client";
import React, {useEffect, useState} from 'react';
import {apiRequest} from '../api/apiService';
import {User} from "@/app/models/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";

export default function UsersList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        apiRequest('users', 'GET').then(response => {
            console.log(response)
            if (response.ok) {
                setUsers(response.data);
            }
        });
    }, []);

    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>First Name</TableColumn>
                <TableColumn>Last Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Class Group</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>

            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>{user.firstname}</TableCell>
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.classGroupId}</TableCell>
                        <TableCell>
                            <button className="p-1 rounded-md bg-blue-500 text-white">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="p-1 rounded-md bg-red-500 text-white ml-2">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}