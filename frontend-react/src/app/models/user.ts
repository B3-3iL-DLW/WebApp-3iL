// src/app/models/user.ts

export interface User {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: string;
    classGroupId: number | null;
}