export interface UserDetail {
    userDetailsId: number | null;
    userNif: string;
    userPhone: string;
    userPhoneToken: string;

}

export class UserDetailImpl implements UserDetail {
    constructor(
        public userDetailsId: number | null,
        public userNif: string,
        public userPhone: string,
        public userPhoneToken: string
    ) { }
}