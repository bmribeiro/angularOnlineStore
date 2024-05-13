export interface SizeCategory {
  sizeCategoryId: number | null;
  sizeCategoryName: string
}

export class SizeCategoryImpl implements SizeCategory {
  constructor(
    public sizeCategoryId: number | null,
    public sizeCategoryName: string
  ) { }
}
