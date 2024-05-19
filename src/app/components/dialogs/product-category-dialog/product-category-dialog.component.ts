import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, matDialogAnimations } from '@angular/material/dialog';
import { ProductCategory } from '../../../models/ProductCategory';
import { SizeCategory } from '../../../models/SizeCategory';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-category-dialog',
  templateUrl: './product-category-dialog.component.html',
  styleUrl: './product-category-dialog.component.css',
  animations: [matDialogAnimations.dialogContainer]
})
export class ProductCategoryDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // Combo Data
  sizes: SizeCategory[];
  parentCategories: ProductCategory[];

  // ProductCategory
  productCategoryEl: ProductCategory = {
    productCategoryId: null,
    categoryName: '',
    categoryImage: '',
    imageBytes: '',
    categoryDescription: '',
    sizeCategory: null,
    parentProductCategory: null,
    file: undefined
  };

  // File
  fileName = '';
  file: File | undefined;

  constructor(public productCategoryDialogRef: MatDialogRef<ProductCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.sizes = data.sizeCategories;
    this.parentCategories = data.parentCategories;

    if (data.productCategory != null) {

      // Edit ProductCategory
      this.formGroup = new FormGroup({
        productCategoryId: new FormControl(data.productCategory.productCategoryId),
        categoryName: new FormControl(data.productCategory.categoryName, Validators.required),
        categoryImage: new FormControl(data.productCategory.categoryImage),
        categoryDescription: new FormControl(data.productCategory.categoryDescription, Validators.required),
        sizeCategory: new FormControl(data.productCategory.sizeCategory),
        parentProductCategory: new FormControl(data.productCategory.parentProductCategory)
      });

      // New ProductCategory
    } else {
      this.formGroup = new FormGroup({
        productCategoryId: new FormControl(null),
        categoryName: new FormControl('', Validators.required),
        categoryImage: new FormControl(''),
        categoryDescription: new FormControl('', Validators.required),
        sizeCategory: new FormControl(null),
        parentProductCategory: new FormControl(null)
      });
    }
  }

  compareSizeCategoryFunction(el1: SizeCategory, el2: SizeCategory): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.sizeCategoryId === el2.sizeCategoryId : el1 === el2;
    } else
      return false;
  }

  compareProductCategoryFunction(el1: ProductCategory, el2: ProductCategory): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.productCategoryId === el2.productCategoryId : el1 === el2;
    } else
      return false;
  }

  onNoClick(): void {
    this.productCategoryDialogRef.close();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file ? this.file.name : 'No file uploaded yet.';
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const productCategoryIdControl = this.formGroup.get('productCategoryId');
      const categoryNameControl = this.formGroup.get('categoryName');
      const categoryImageControl = this.formGroup.get('categoryImage');
      const categoryDescriptionControl = this.formGroup.get('categoryDescription');
      const sizeCategoryControl = this.formGroup.get('sizeCategory');
      const parentProductCategoryControl = this.formGroup.get('parentProductCategory');

      if (categoryNameControl && categoryDescriptionControl &&
        categoryNameControl.value && categoryDescriptionControl.value) {

        this.productCategoryEl = {
          productCategoryId: productCategoryIdControl ? productCategoryIdControl.value : null,
          categoryName: categoryNameControl.value,
          categoryImage: categoryImageControl ? categoryImageControl.value : null,
          imageBytes: '',
          categoryDescription: categoryDescriptionControl.value,
          sizeCategory: sizeCategoryControl ? sizeCategoryControl.value : null,
          parentProductCategory: parentProductCategoryControl ? parentProductCategoryControl.value : null,
          file: this.file
        };
        this.productCategoryDialogRef.close({
          element: this.productCategoryEl
        });
      }
    }
  }
}
