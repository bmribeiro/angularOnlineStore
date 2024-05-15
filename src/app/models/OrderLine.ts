import { ProductItem } from "./ProductItem";
import { ShopOrder } from "./ShopOrder";

export interface OrderLine {
    orderLineId: number | null;
    productItem: ProductItem;
    shopOrder: ShopOrder
}

export class OrderLineImpl implements OrderLine {
    constructor(
        public orderLineId: number | null,
        public productItem: ProductItem,
        public shopOrder: ShopOrder
    ) { }
}