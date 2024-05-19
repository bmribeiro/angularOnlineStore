import { ProductItem } from "./ProductItem";
import { SizeOption } from "./SizeOption";

export interface ProductVariation {
    productVariationId: number | null;
    productItem: ProductItem | null;
    size: SizeOption | null;
    qtyInStock: number;
}

export class ProductVariationImpl implements ProductVariation {
    constructor(
      public productVariationId: number | null,
      public productItem: ProductItem | null,
      public size: SizeOption | null,
      public qtyInStock: number
    ) { }
  }

  