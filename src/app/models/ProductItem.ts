import { Colour } from "./Colour";
import { Product } from "./Product";
import { ProductItemImage } from "./ProductItemImage";

export interface ProductItem {
    productItemId: number | null;
    product: Product | null;
    colour: Colour | null;
    originalPrice: number;
    salePrice: number;
    productCode: string;
    productItemImages: ProductItemImage[];
}

export class ProductItemImpl implements ProductItem {
    constructor(
        public productItemId: number | null,
        public product: Product | null,
        public colour: Colour | null,
        public originalPrice: number,
        public salePrice: number,
        public productCode: string,
        public productItemImages: ProductItemImage[]
    ) { }

}