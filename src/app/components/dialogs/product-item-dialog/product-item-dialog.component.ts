import { Component, Inject } from '@angular/core';
import { Colour } from '../../../models/Colour';
import { Product } from '../../../models/Product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeOptionDialogComponent } from '../attribute-option-dialog/attribute-option-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductItem } from '../../../models/ProductItem';

@Component({
  selector: 'app-product-item-dialog',
  templateUrl: './product-item-dialog.component.html',
  styleUrl: './product-item-dialog.component.css'
})
export class ProductItemDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // Combo Data
  products!: Product[];
  colours!: Colour[];

  // File
  fileName = '';
  file: File | undefined;

  // AttributeOption
  productItemEl: ProductItem = {
    productItemId: null,
    product: null,
    colour: null,
    originalPrice: 0,
    salePrice: 0,
    productCode: '',
    file: undefined
  };

  constructor(public productItemDialogRef: MatDialogRef<AttributeOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.products = data.products;
    this.colours = data.colours;

    if (data.productItem != null) {

      // Edição AttributeOption
      this.formGroup = new FormGroup({
        productItemId: new FormControl(data.productItem.productItemId),
        product: new FormControl(data.productItem.product, Validators.required),
        colour: new FormControl(data.productItem.colour, Validators.required),
        originalPrice: new FormControl(data.productItem.originalPrice, Validators.required),
        salePrice: new FormControl(data.productItem.salePrice, Validators.required),
        productCode: new FormControl(data.productItem.productCode, Validators.required)
      });

      // Novo AttributeOption
    } else {
      this.formGroup = new FormGroup({
        productItemId: new FormControl(null),
        product: new FormControl(null, Validators.required),
        colour: new FormControl(null, Validators.required),
        originalPrice: new FormControl(0, Validators.required),
        salePrice: new FormControl(0, Validators.required),
        productCode: new FormControl(0, Validators.required)
      });
    }
  }

  compareProductFunction(el1: Product, el2: Product): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.productId === el2.productId : el1 === el2;
    } else
      return false;
  }

  compareColourFunction(el1: Colour, el2: Colour): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.colourId === el2.colourId : el1 === el2;
    } else
      return false;
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
    if (this.formGroup.valid) {
      const productItemIdControl = this.formGroup.get('productItemId');
      const productControl = this.formGroup.get('product');
      const colourControl = this.formGroup.get('colour');
      const originalPriceControl = this.formGroup.get('originalPrice');
      const salePriceControl = this.formGroup.get('salePrice');
      const productCodeControl = this.formGroup.get('productCode');

      console.log('Product: ' + productControl);
      console.log('Colour' + colourControl);

      if (productControl && colourControl && 
        productControl.value && colourControl.value) {
        this.productItemEl = {
          productItemId: productItemIdControl ? productItemIdControl.value : null,
          product: productControl ? productControl.value : null,
          colour: colourControl ? colourControl.value : null,
          originalPrice: originalPriceControl?.value,
          salePrice: salePriceControl?.value,
          productCode: productCodeControl?.value,
          file: this.file
        };
        this.productItemDialogRef.close({
          element: this.productItemEl
        });
      }
    }
  }
}

