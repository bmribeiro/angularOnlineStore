import { Brand } from "./Brand";
import { ProductCategory } from "./ProductCategory";
import { ProductImage } from "./ProductImage";

export interface Product {
  productId: number | null;
  productCategory: ProductCategory | null;
  brand: Brand | null;
  productName: string;
  productDescription: string;
  careInstructions: string;
  about: string;
  productImages: ProductImage[];
}

export class ProductImpl implements Product {
  constructor(
    public productId: number | null,
    public productCategory: ProductCategory | null,
    public brand: Brand | null,
    public productName: string,
    public productDescription: string,
    public careInstructions: string,
    public about: string,
    public productImages: ProductImage[]
  ) { }
}
