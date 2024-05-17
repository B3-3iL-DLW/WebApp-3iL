// src/app/users/userTable.tsx
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip} from "@nextui-org/react";
import {EditIcon} from "./EditIcon";
import {DeleteIcon} from "./DeleteIcon";
import {apiRequest} from '../api/apiService';
import {User} from "@/app/models/user";

const columns = [
    {name: "ID", uid: "id"},
    {name: "Prénom", uid: "firstname"},
    {name: "Nom", uid: "lastname"},
    {name: "Email", uid: "email"},
    {name: "Rôle", uid: "role"},
    {name: "Groupe de classe", uid: "classGroupId"},
    {name: "ACTIONS", uid: "actions"},
];

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        apiRequest('users', 'GET').then(response => {
            if (response.ok) {
                setUsers(response.data);
            }
        });
    }, []);

    const handleDelete = async (id: number) => {
        await apiRequest(`users/${id}`, 'DELETE');
        setUsers(users.filter(user => user.id !== id));
    };

    const handleKeyDown = (event: React.KeyboardEvent, id: number) => {
        if (event.key === 'Enter') {
            handleDelete(id).then(r => r);
        }
    };

    const renderCell = React.useCallback((user: User, columnKey: string | number) => {
        const cellValue = user[columnKey as keyof User];

        switch (columnKey) {
            case "firstname":
            case "lastname":
            case "email":
            case "role":
            case "classGroupId":
                return cellValue;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit user">
                            <button className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon/>
                            </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <button className="text-lg text-danger cursor-pointer active:opacity-50"
                                    onClick={() => handleDelete(user.id)}
                                    onKeyDown={(event) => handleKeyDown(event, user.id)}>
                                <DeleteIcon/>
                            </button>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [users]);

    return (
        <div style={{padding: '20px', color: 'black'}}>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {(item: User) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}