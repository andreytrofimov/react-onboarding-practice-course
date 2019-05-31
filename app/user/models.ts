export interface User {
    id?: number;
    login?: string;
    role?: Role;
    password?: string;
}

export enum Role {
    Public = 'Public',
    Admin = 'Admin',
    Operator = 'Operator',
}
