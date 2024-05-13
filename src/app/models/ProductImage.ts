import { ProductItem } from "./ProductItem";

export interface ProductImage {
  productImageId: number | null;
  productItem: ProductItem;
  imageFile: string;
}

export class ProductImageImpl implements ProductImage {
  constructor(
    public productImageId: number | null,
    public productItem: ProductItem,
    public imageFile: string
  ) { }
}
