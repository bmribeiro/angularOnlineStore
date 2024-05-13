import { Component, Inject } from '@angular/core';
import { ProductCategory } from '../../../models/ProductCategory';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from '../../../models/Brand';
import { AttributeOptionDialogComponent } from '../attribute-option-dialog/attribute-option-dialog.component';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent {

  // Combo Data
  productCategories!: ProductCategory[];
  brands!: Brand[];

  // Selected
  selectedProductCategory!: ProductCategory;
  selectedBrand!: Brand;

  // Dialog Fields
  productName!: string;
  productDescription!: string;
  careInstructions!: string;
  about!: string;

  // File
  fileName = '';
  file: File | undefined;

  constructor(public attributeOptionDialogRef: MatDialogRef<AttributeOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productCategories = data.dataProductCategories;
    this.brands = data.dataBrands;
  }

  onNoClick(): void {
    this.attributeOptionDialogRef.close();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }
  }

  confirm(): void {
    this.attributeOptionDialogRef.close({
      selectedProductCategory: this.selectedProductCategory,
      selectedBrand: this.selectedBrand,
      productName: this.productName,
      productDescription: this.productDescription,
      careInstructions: this.careInstructions,
      about: this.about,
      file: this.file
    });
  }

}
