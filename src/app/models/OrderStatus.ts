export interface OrderStatus {
    orderStatusId: number | null;
    status: string;
}

export class OrderStatusImpl implements OrderStatus {
    constructor(
        public orderStatusId: number | null,
        public status: string
    ) { }
}