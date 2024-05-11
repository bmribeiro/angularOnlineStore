import { ProductItem } from "./ProductItem";
import { SizeOption } from "./SizeOption";

export interface ProductVariation {
    productVariationId: number | null;
    productItem: ProductItem;
    size: SizeOption;
    qtyInStock: number;
}