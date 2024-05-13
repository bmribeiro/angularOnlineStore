import { SizeCategory } from "./SizeCategory";

export interface ProductCategory {
    productCategoryId: number | null;
    categoryName: string;
    categoryImage: File;
    categoryDescription: string;
    sizeCategory: SizeCategory
    parentProductCategory: ProductCategory
}

export class ProductCategoryImpl implements ProductCategory {
    constructor(
        public productCategoryId: number | null,
        public categoryName: string,
        public categoryImage: File,
        public categoryDescription: string,
        public sizeCategory: SizeCategory,
        public parentProductCategory: ProductCategory
    ) { }
}

