import { ProductItem } from "./ProductItem";
import { SizeOption } from "./SizeOption";

export interface ProductVariation {
    productVariationId: number | null;
    productItem: ProductItem;
    size: SizeOption;
    qtyInStock: number;
}

export class ProductVariationImpl implements ProductVariation {
    constructor(
      public productVariationId: number | null,
      public productItem: ProductItem,
      public size: SizeOption,
      public qtyInStock: number
    ) { }
  }

  