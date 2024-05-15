import { Address } from "./Address";
import { OrderStatus } from "./OrderStatus";
import { ShippingMethod } from "./ShippingMethod";
import { User } from "./User";
import { UserPaymentMethod } from "./UserPaymentMethod";

export interface ShopOrder {
    shopOrderId: number | null;
    user: User;
    orderDate: Date;
    paymentMethod: UserPaymentMethod;
    shippingAddress: Address;
    shippingMethod: ShippingMethod;
    orderTotal: number;
    orderStatus: OrderStatus
}

export class ShopOrderImpl implements ShopOrder {
    constructor(
        public shopOrderId: number | null,
        public user: User,
        public orderDate: Date,
        public paymentMethod: UserPaymentMethod,
        public shippingAddress: Address,
        public shippingMethod: ShippingMethod,
        public orderTotal: number,
        public orderStatus: OrderStatus
    ) { }
}