import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategory } from '../../../models/ProductCategory';
import { SizeCategory } from '../../../models/SizeCategory';

@Component({
  selector: 'app-product-category-dialog',
  templateUrl: './product-category-dialog.component.html',
  styleUrl: './product-category-dialog.component.css'
})
export class ProductCategoryDialogComponent {

  // Combo Data
  sizes: SizeCategory[];
  parentCategories: ProductCategory[];

  // Selected
  selectedSize!: SizeCategory;
  selectedParentCategory!: ProductCategory;

  // Dialog Fields
  categoryName!: string;
  categoryImage!: File;
  categoryDescription!: string;

  // File
  fileName = '';
  file: File | undefined;

  constructor(public productCategoryDialogRef: MatDialogRef<ProductCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sizes = data.dataSizeCategories;
    this.parentCategories = data.dataParentCategories;
  }

  onNoClick(): void {
    this.productCategoryDialogRef.close();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }
  }

  confirm(): void {
    this.productCategoryDialogRef.close({
      categoryName: this.categoryName,
      categoryImage: this.fileName,
      categoryDescription: this.categoryDescription,
      selectedSize: this.selectedSize,
      parentCategories: this.selectedParentCategory,
      file: this.file
    });
  }

}
