import { ProductCategory } from "./ProductCategory";

export interface CategoryImage {
  categoryImageId: number | null;
  productCategory: ProductCategory | null;
  imageFilename: string;
  imageOrder: number;
  isAlbumCover: boolean,
  imageBase64: string
}

export class CategoryImageImpl implements CategoryImage {
  constructor(
    public categoryImageId: number | null,
    public productCategory: ProductCategory | null,
    public imageFilename: string,
    public imageOrder: number,
    public isAlbumCover: boolean,
    public imageBase64: string
  ) { }
}
