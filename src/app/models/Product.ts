import { Brand } from "./Brand";
import { ProductCategory } from "./ProductCategory";

export interface Product {
    productId: number | null;
    productCategory : ProductCategory;
    brand : Brand;
    productImage : String;
    productDescription : String;
    careInstructions : String;
    about : String;
  }