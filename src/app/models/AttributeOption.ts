import { AttributeType } from "./AttributeType";

export interface AttributeOption {
    attributeOptionId: number | null;
    attributeType: AttributeType | null;
    attributeOptionName: string;
}

export class AttributeOptionImpl implements AttributeOption {
    constructor(
        public attributeOptionId: number | null,
        public attributeType: AttributeType | null,
        public attributeOptionName: string
    ) { }
}
