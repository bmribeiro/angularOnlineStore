import { UserRole } from "./UserRole";

export interface User {
    userId: number | null;
    userName: string;
    userEmail: string;
    userPassword: string;
    userToken: string;
    isActive: string;
    isGoogle: string;
    createdAt: string;
    role: UserRole
}

export class UserImpl implements User {
    constructor(
        public userId: number | null,
        public userName: string,
        public userEmail: string,
        public userPassword: string,
        public userToken: string,
        public isActive: string,
        public isGoogle: string,
        public createdAt: string,
        public role: UserRole
    ) { }
}