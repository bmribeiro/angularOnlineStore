export interface AttributeType {
    attributeTypeId: number | null;
    attributeName: string;
}

export class AttributeTypeImpl implements AttributeType {
    constructor(
        public attributeTypeId: number | null,
        public attributeName: string
    ) { }
}