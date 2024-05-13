export interface Brand {
  brandId: number | null;
  brandName: string;
  brandDescription: string;
}

export class BrandImpl implements Brand {
  constructor(
    public brandId: number | null,
    public brandName: string,
    public brandDescription: string
  ) { }
}
