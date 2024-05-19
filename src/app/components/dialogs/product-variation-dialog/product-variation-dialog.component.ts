import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttributeType } from '../../../models/AttributeType';
import { ProductVariation } from '../../../models/ProductVariation';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductItem } from '../../../models/ProductItem';
import { SizeOption } from '../../../models/SizeOption';

@Component({
  selector: 'app-product-variation-dialog',
  templateUrl: './product-variation-dialog.component.html',
  styleUrl: './product-variation-dialog.component.css'
})
export class ProductVariationDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // AttributeTypes
  productItems: ProductItem[];
  sizeOptions: SizeOption[];

  // AttributeOption
  productVariationEl: ProductVariation = {
    productVariationId: null,
    productItem: null,
    size: null,
    qtyInStock: 0
  };

  constructor(public productVariationialogRef: MatDialogRef<ProductVariationDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.productItems = data.productItems;
    this.sizeOptions = data.sizeOptions;

    if (data.productVariation != null) {

      // Edit ProductVariation
      this.formGroup = new FormGroup({
        productVariationId: new FormControl(data.productVariation.productVariationId),
        productItem: new FormControl(data.productVariation.productItem, Validators.required),
        sizeOption: new FormControl(data.productVariation.sizeOption, Validators.required),
        qtyInStock: new FormControl(data.productVariation.qtyInStock, Validators.required)
      });

      // New ProductVariation
    } else {
      this.formGroup = new FormGroup({
        productVariationId: new FormControl(null),
        productItem: new FormControl(null, Validators.required),
        sizeOption: new FormControl(null, Validators.required),
        qtyInStock: new FormControl('', Validators.required)
      });
    }
  }

  compareProductItemFunction(el1: ProductItem, el2: ProductItem): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.productItemId === el2.productItemId : el1 === el2;
    } else
      return false;
  }

  compareSizeOptionFunction(el1: SizeOption, el2: SizeOption): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.sizeOptionId === el2.sizeOptionId : el1 === el2;
    } else
      return false;
  }

  onNoClick(): void {
    this.productVariationialogRef.close();
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const productVariationIdControl = this.formGroup.get('productVariationId');
      const productItemControl = this.formGroup.get('productItem');
      const sizeOptionControl = this.formGroup.get('sizeOption');
      const qtyInStockControl = this.formGroup.get('qtyInStock');

      console.log('productVariationId' + productVariationIdControl);
      console.log('productItem' + productItemControl?.value);
      console.log('sizeOption' + sizeOptionControl?.value);
      console.log('qtyInStock' + qtyInStockControl?.value);

      if (productItemControl && sizeOptionControl
        && productItemControl.value && sizeOptionControl.value) {
        this.productVariationEl = {
          productVariationId: productVariationIdControl ? productVariationIdControl.value : null,
          productItem: productItemControl ? productItemControl.value : null,
          size: sizeOptionControl ? sizeOptionControl.value : null,
          qtyInStock: qtyInStockControl?.value
        };
        this.productVariationialogRef.close({
          element: this.productVariationEl
        });
      }
    }
  }
}
