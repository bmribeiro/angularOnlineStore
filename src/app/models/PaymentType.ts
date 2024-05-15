export interface PaymentType {
    paymentTypeId: number | null;
    value: string;
}

export class PaymentTypeImpl implements PaymentType {
    constructor(
        public paymentTypeId: number | null,
        public value: string
    ) { }
}