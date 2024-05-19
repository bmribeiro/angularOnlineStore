import { SizeCategory } from "./SizeCategory";

export interface SizeOption {
    sizeOptionId: number | null;
    sizeName: string;
    sortOrder: number;
    sizeCategory: SizeCategory | null
}

export class SizeOptionImpl implements SizeOption {
    constructor(
        public sizeOptionId: number | null,
        public sizeName: string,
        public sortOrder: number,
        public sizeCategory: SizeCategory | null
    ) { }
}
