import { Product } from "./Product";

export interface ProductImage {
  productImageId: number | null;
  product: Product | null;
  imageFilename: string;
  imageOrder: number;
  isProductCover: boolean,
  imageBase64: string,
  file : File | null
}

export class ProductImageImpl implements ProductImage {
  constructor(
    public productImageId: number | null,
    public product: Product | null,
    public imageFilename: string,
    public imageOrder: number,
    public isProductCover: boolean,
    public imageBase64: string,
    public file: File | null
  ) { }
}
