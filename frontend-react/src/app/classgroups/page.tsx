"use client";
import React, {useEffect, useState} from 'react';

type ClassGroup = {
    id: string;
    name: string;
};

const ClassGroupsPage = () => {
    const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);

    useEffect(() => {
        const fetchClassGroups = async () => {
            const token = document.cookie.split('; ').find(row => row.startsWith('jwt'))?.split('=')[1];
            if (!token) {
                return;
            }
            console.log('token:', token);
            try {
                const response = await fetch('http://localhost:3000/api/classgroups', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        console.error('Unauthorized: Invalid or expired token');
                    } else {
                        console.error('API request failed:', response.status, response.statusText);
                    }
                    return;
                }
                const data: ClassGroup[] = await response.json();
                if (Array.isArray(data)) {
                    setClassGroups(data);
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Failed to fetch class groups:', error);
            }
        };

        fetchClassGroups().then(r => console.log(r));
    }, []);

    return (
        <div>
            <select>
                {classGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                        {group.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ClassGroupsPage;