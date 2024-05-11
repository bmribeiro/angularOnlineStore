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