import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategory } from '../../../models/ProductCategory';

@Component({
  selector: 'app-product-category-dialog',
  templateUrl: './product-category-dialog.component.html',
  styleUrl: './product-category-dialog.component.css'
})
export class ProductCategoryDialogComponent {

  imageUrl: any;

  constructor(public productCategoryDialogRef: MatDialogRef<ProductCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCategory
  ) { }

  onNoClick(): void {
    this.productCategoryDialogRef.close();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.imageUrl = URL.createObjectURL(file);
    this.data.categoryImage = file;
  }
}
