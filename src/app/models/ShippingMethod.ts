export interface ShippingMethod {
    shippingMethodId: number | null;
    name: string;
    price: number;

}

export class ShippingMethodImpl implements ShippingMethod {
    constructor(
        public shippingMethodId: number | null,
        public name: string,
        public price: number,

    ) { }
}