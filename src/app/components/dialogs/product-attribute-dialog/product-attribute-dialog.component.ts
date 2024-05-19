import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/Product';
import { AttributeOption } from '../../../models/AttributeOption';
import { ProductAttribute } from '../../../models/ProductAttribute';

@Component({
  selector: 'app-product-attribute-dialog',
  templateUrl: './product-attribute-dialog.component.html',
  styleUrl: './product-attribute-dialog.component.css'
})
export class ProductAttributeDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // Combo Data
  products: Product[];
  attributeOptions: AttributeOption[];

  // AttributeOption
  productAttributeEl: ProductAttribute = {
    productAttributeId: null,
    product: null,
    attributeOption: null
  };

  constructor(public productAttributeDialogRef: MatDialogRef<ProductAttributeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.products = data.products;
    this.attributeOptions = data.attributeOptions;

    if (data.productAttribute != null) {

      // Edição ProductAttribute
      this.formGroup = new FormGroup({
        productAttributeId: new FormControl(data.productAttribute.productAttributeId),
        product: new FormControl(data.productAttribute.attributeOption, Validators.required),
        attributeOption: new FormControl(data.productAttribute.attributeOption, Validators.required)
      });

      // Novo ProductAttribute
    } else {
      this.formGroup = new FormGroup({
        productAttributeId: new FormControl(null),
        product: new FormControl(null, Validators.required),
        attributeOption: new FormControl(null, Validators.required)
      });
    }
  }

  compareProductFunction(el1: Product, el2: Product): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.productId === el2.productId : el1 === el2;
    } else
      return false;
  }

  compareAttributeOptionFunction(el1: AttributeOption, el2: AttributeOption): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.attributeOptionId === el2.attributeOptionId : el1 === el2;
    } else
      return false;
  }

  onNoClick(): void {
    this.productAttributeDialogRef.close();
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const productAttributeIdControl = this.formGroup.get('productAttributeId');
      const productControl = this.formGroup.get('product');
      const attributeOptionControl = this.formGroup.get('attributeOption');

      if (productControl && attributeOptionControl && productControl.value && attributeOptionControl.value) {
        this.productAttributeEl = {
          productAttributeId: productAttributeIdControl ? productAttributeIdControl.value : null,
          product: productControl.value,
          attributeOption: attributeOptionControl.value
        };
        this.productAttributeDialogRef.close({
          element: this.productAttributeEl
        });
      }
    }
  }
}
