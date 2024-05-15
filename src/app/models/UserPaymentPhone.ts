import { User } from "./User";

export interface UserPaymentPhone {
    userPaymentPhoneid: number | null;
    user: User;
    userPhone: string;
    userPhoneToken: string;
}

export class UserPaymentPhoneImpl implements UserPaymentPhone {
    constructor(
        public userPaymentPhoneid: number | null,
        public user: User,
        public userPhone: string,
        public userPhoneToken: string
    ) { }
}