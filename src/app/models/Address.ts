export interface Address {
    addressId: number | null;
    streetName: string;
    city: string;
    region: string;
    postalCode: string;
    removed: boolean;
}

export class AddressImpl implements Address {
    constructor(
        public addressId: number | null,
        public streetName: string,
        public city: string,
        public region: string,
        public postalCode: string,
        public removed: boolean
    ) { }
}