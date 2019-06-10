import { Role } from './role';

export interface User {
    id?: number;
    login?: string;
    role?: Role;
    password?: string;
}
