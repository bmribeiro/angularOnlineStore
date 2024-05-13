import { Brand } from "./Brand";
import { ProductCategory } from "./ProductCategory";

export interface Product {
  productId: number | null;
  productCategory: ProductCategory;
  brand: Brand;
  productName: string;
  productDescription: string;
  careInstructions: string;
  about: string;
}

export class ProductImpl implements Product {
  constructor(
    public productId: number | null,
    public productCategory: ProductCategory,
    public brand: Brand,
    public productName: string,
    public productDescription: string,
    public careInstructions: string,
    public about: string
  ) { }
}
