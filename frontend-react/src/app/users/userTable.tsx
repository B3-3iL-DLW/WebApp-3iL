import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip} from "@nextui-org/react";
import {EditIcon} from "./EditIcon";
import {DeleteIcon} from "./DeleteIcon";
import { apiRequest } from '../api/apiService';

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
    const [users, setUsers] = useState([]);

    useEffect(() => {
        apiRequest('users', 'GET').then(response => {
            if (response.ok) {
                setUsers(response.data);
            }
        });
    }, []);

    const renderCell = React.useCallback((user: { [x: string]: any; }, columnKey: string | number) => {
        const cellValue = user[columnKey];

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
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div style={{ padding: '20px', color: 'black' }}>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}