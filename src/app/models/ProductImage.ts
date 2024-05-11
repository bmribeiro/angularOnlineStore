import { ProductItem } from "./ProductItem";

export interface ProductImage {
    productImageId: number | null;
    productItem: ProductItem;
    imageFile: string;
  }