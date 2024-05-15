export interface UserBilling {
    userBillingId: number | null;
    userBillingName: string;
    userBillingNif: string;
    userBillingPhone: string;

}

export class UserBillingImpl implements UserBilling {
    constructor(
        public userBillingId: number | null,
        public userBillingName: string,
        public userBillingNif: string,
        public userBillingPhone: string
    ) { }
}