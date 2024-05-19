import { AttributeOption } from "./AttributeOption";
import { Product } from "./Product";

export interface ProductAttribute {
    productAttributeId: number | null;
    product: Product | null,
    attributeOption: AttributeOption | null;
}

export class ProductAttributeImpl implements ProductAttribute {
    constructor(
        public productAttributeId: number | null,
        public product: Product | null,
        public attributeOption: AttributeOption | null
    ) { }
}

