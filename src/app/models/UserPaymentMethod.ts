import { PaymentType } from "./PaymentType";
import { User } from "./User";
import { UserBilling } from "./UserBilling";

export interface UserPaymentMethod {
    userPaymentMethodId: number | null;
    user: User;
    userBilling: UserBilling;
    paymentType: PaymentType;
    expiryDate: Date;
    isDefault: boolean;

}

export class UserPaymentMethodImpl implements UserPaymentMethod {
    constructor(
        public userPaymentMethodId: number | null,
        public user: User,
        public userBilling: UserBilling,
        public paymentType: PaymentType,
        public expiryDate: Date,
        public isDefault: boolean
    ) { }
}