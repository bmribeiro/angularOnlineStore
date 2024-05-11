import { SizeCategory } from "./SizeCategory";

export interface ProductCategory {
    productCategoryId: number | null;
    categoryName: string;
    categoryImage: File;
    categoryDescription: string;
    sizeCategory: SizeCategory
    parentProductCategory: ProductCategory
}