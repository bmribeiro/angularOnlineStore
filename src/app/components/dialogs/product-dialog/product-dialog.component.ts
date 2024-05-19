import { Component, Inject } from '@angular/core';
import { ProductCategory } from '../../../models/ProductCategory';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from '../../../models/Brand';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // Combo Data
  productCategories!: ProductCategory[];
  brands!: Brand[];

  // ProductCategory
  productEl: Product = {
    productId: null,
    productCategory: null,
    brand: null,
    productName: '',
    productDescription: '',
    careInstructions: '',
    about: '',
    file: undefined
  };

  // File
  fileName = '';
  file: File | undefined;

  constructor(public productDialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    console.log('Product' + data.product.productId)

    this.productCategories = data.dataProductCategories;
    this.brands = data.dataBrands;

    if (data.product != null) {

      console.log('Editar');

      // Edit ProductCategory
      this.formGroup = new FormGroup({
        productId: new FormControl(data.product.productId),
        productCategory: new FormControl(data.product.productCategory, Validators.required),
        brand: new FormControl(data.product.brand),
        productName: new FormControl(data.product.productName, Validators.required),
        productDescription: new FormControl(data.product.productDescription),
        careInstructions: new FormControl(data.product.careInstructions),
        about: new FormControl(data.product.about),
      });

      // New ProductCategory
    } else {
      this.formGroup = new FormGroup({
        productId: new FormControl(null),
        productCategory: new FormControl(null, Validators.required),
        brand: new FormControl(null),
        productName: new FormControl('', Validators.required),
        productDescription: new FormControl(''),
        careInstructions: new FormControl(''),
        about: new FormControl('')
      });
    }
  }

  compareProductCategoryFunction(el1: ProductCategory, el2: ProductCategory): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.productCategoryId === el2.productCategoryId : el1 === el2;
    } else
      return false;
  }

  compareBrandFunction(el1: Brand, el2: Brand): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.brandId === el2.brandId : el1 === el2;
    } else
      return false;
  }

  onNoClick(): void {
    this.productDialogRef.close();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const productIdControl = this.formGroup.get('productId');
      const productCategoryControl = this.formGroup.get('productCategory');
      const brandControl = this.formGroup.get('brand');
      const productNameControl = this.formGroup.get('productName');
      const productDescriptionControl = this.formGroup.get('productDescription');
      const careInstructionsControl = this.formGroup.get('careInstructions');
      const aboutControl = this.formGroup.get('about');

      if (productCategoryControl && brandControl &&
        productCategoryControl.value && brandControl.value) {

        this.productEl = {
          productId: productIdControl ? productIdControl.value : null,
          productCategory: productCategoryControl.value,
          brand: brandControl ? brandControl.value : null,
          productName: productNameControl?.value,
          productDescription: productDescriptionControl?.value,
          careInstructions: careInstructionsControl ? careInstructionsControl.value : null,
          about: aboutControl ? aboutControl.value : null,
          file: this.file
        };
        this.productDialogRef.close({
          element: this.productEl
        });
      }
    }
  }

}
