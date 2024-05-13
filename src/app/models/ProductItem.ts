import { Colour } from "./Colour";
import { Product } from "./Product";

export interface ProductItem {
    productItemId: number | null;
    product: Product;
    colour: Colour;
    originalPrice: number;
    salePrice: number;
    productCode: string;
}

export class ProductItemImpl implements ProductItem {
    constructor(
        public productItemId: number | null,
        public product: Product,
        public colour: Colour,
        public originalPrice: number,
        public salePrice: number,
        public productCode: string,
    ) { }

}