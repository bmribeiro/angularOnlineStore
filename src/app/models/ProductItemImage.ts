import { ProductItem } from "./ProductItem";

export interface ProductItemImage {
  productItemImageId: number | null;
  productItem: ProductItem | null;
  imageFilename: string;
  imageOrder: number;
  isProductItemCover: boolean,
  imageBase64: string,
  file: File | null
}

export class ProductItemImageImpl implements ProductItemImage {
  constructor(
    public productItemImageId: number | null,
    public productItem: ProductItem | null,
    public imageFilename: string,
    public imageOrder: number,
    public isProductItemCover: boolean,
    public imageBase64: string,
    public file: File | null
  ) { }
}
