import { Component, Inject } from '@angular/core';
import { Colour } from '../../../models/Colour';
import { Product } from '../../../models/Product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeOptionDialogComponent } from '../attribute-option-dialog/attribute-option-dialog.component';

@Component({
  selector: 'app-product-item-dialog',
  templateUrl: './product-item-dialog.component.html',
  styleUrl: './product-item-dialog.component.css'
})
export class ProductItemDialogComponent {

  // Combo Data
  products!: Product[];
  colours!: Colour[];

  // Selected
  selectedProduct!: Product;
  selectedColour!: Colour;

  // Dialog Fields
  originalPrice!: string;
  salePrice!: string;
  productCode!: string;

  // File
  fileName = '';
  file: File | undefined;

  constructor(public productItemDialogRef: MatDialogRef<AttributeOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.products = data.products;
    this.colours = data.colours;
  }

  onNoClick(): void {
    this.productItemDialogRef.close();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }
  }

  confirm(): void {
    this.productItemDialogRef.close({
      selectedProduct: this.selectedProduct,
      selectedColour: this.selectedColour,
      originalPrice: this.originalPrice,
      salePrice: this.salePrice,
      productCode: this.productCode,
      file: this.file
    });
  }
}

