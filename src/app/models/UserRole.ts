export interface UserRole {
    userRoleId: number | null;
    roleName: string;
}

export class UserRoleImpl implements UserRole {
    constructor(
        public userRoleId: number | null,
        public roleName: string
    ) { }
}