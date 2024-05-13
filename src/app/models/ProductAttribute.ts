import { AttributeOption } from "./AttributeOption";
import { Product } from "./Product";

export interface ProductAttribute {
    product: Product,
    attributeOption: AttributeOption;
}

export class ProductAttributeImpl implements ProductAttribute {
    constructor(
        public product: Product,
        public attributeOption: AttributeOption
    ) { }
}

