import { SizeCategory } from "./SizeCategory";

export interface SizeOption {
    sizeOptionId: number | null;
    sizeName: string;
    sortOrder: number;
    sizeCategory: SizeCategory
}