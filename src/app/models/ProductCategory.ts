import { CategoryImage } from "./CategoryImage";
import { SizeCategory } from "./SizeCategory";

export interface ProductCategory {
    productCategoryId: number | null;
    categoryName: string;
    categoryDescription: string;
    sizeCategory: SizeCategory | null;
    parentProductCategory: ProductCategory | null;
    categoryImages: CategoryImage[];
}

export class ProductCategoryImpl implements ProductCategory {
    constructor(
        public productCategoryId: number | null,
        public categoryName: string,
        public categoryDescription: string,
        public sizeCategory: SizeCategory | null,
        public parentProductCategory: ProductCategory | null,
        public categoryImages: CategoryImage[]
    ) { }
}

