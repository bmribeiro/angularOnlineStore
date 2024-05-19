import { SizeCategory } from "./SizeCategory";

export interface ProductCategory {
    productCategoryId: number | null;
    categoryName: string;
    categoryImage: string;
    imageBytes: string;
    categoryDescription: string;
    sizeCategory: SizeCategory | null
    parentProductCategory: ProductCategory | null
    file?: File
}

export class ProductCategoryImpl implements ProductCategory {
    constructor(
        public productCategoryId: number | null,
        public categoryName: string,
        public categoryImage: string,
        public imageBytes: string,
        public categoryDescription: string,
        public sizeCategory: SizeCategory | null,
        public parentProductCategory: ProductCategory | null,
        public file?: File
    ) { }
}

