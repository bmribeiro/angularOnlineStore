import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, matDialogAnimations } from '@angular/material/dialog';
import { ProductCategory } from '../../../models/ProductCategory';
import { SizeCategory } from '../../../models/SizeCategory';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryImage } from '../../../models/CategoryImage';

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

  // Category
  productCategoryEl: ProductCategory = {
    productCategoryId: null,
    categoryName: '',
    categoryDescription: '',
    sizeCategory: null,
    parentProductCategory: null,
    categoryImages: []
  };

  // Image
  categoryImage: CategoryImage = {
    categoryImageId: null,
    productCategory: null,
    imageFilename: '',
    imageOrder: 0,
    isAlbumCover: false,
    imageBase64: ''
  }

  categoryImages: CategoryImage[] = [];

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
        categoryDescription: new FormControl(data.productCategory.categoryDescription, Validators.required),
        sizeCategory: new FormControl(data.productCategory.sizeCategory),
        parentProductCategory: new FormControl(data.productCategory.parentProductCategory)
      });

      // New ProductCategory
    } else {

      this.formGroup = new FormGroup({
        productCategoryId: new FormControl(null),
        categoryName: new FormControl('', Validators.required),
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

    // File
    const file: File = event.target.files[0];

    // Order
    const order = this.categoryImages.length;

    // Objeto CategoryImage
    const categoryImage: CategoryImage = {
      categoryImageId: null,
      productCategory: null,
      imageFilename: file.name,
      imageOrder: order,
      isAlbumCover: false,
      imageBase64: ''
    };

    const reader = new FileReader();
    reader.onload = () => {
      categoryImage.imageBase64 = reader.result as string;
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
    reader.readAsDataURL(event.target.files[0]);

    this.categoryImages.push(categoryImage);
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const productCategoryIdControl = this.formGroup.get('productCategoryId');
      const categoryNameControl = this.formGroup.get('categoryName');
      const categoryDescriptionControl = this.formGroup.get('categoryDescription');
      const sizeCategoryControl = this.formGroup.get('sizeCategory');
      const parentProductCategoryControl = this.formGroup.get('parentProductCategory');

      if (categoryNameControl && categoryDescriptionControl &&
        categoryNameControl.value && categoryDescriptionControl.value) {

        this.productCategoryEl = {
          productCategoryId: productCategoryIdControl ? productCategoryIdControl.value : null,
          categoryName: categoryNameControl.value,
          categoryDescription: categoryDescriptionControl.value,
          sizeCategory: sizeCategoryControl ? sizeCategoryControl.value : null,
          parentProductCategory: parentProductCategoryControl ? parentProductCategoryControl.value : null,
          categoryImages: this.categoryImages
        };
        
        console.log('Dialog: ' + JSON.stringify(this.productCategoryEl));
        this.productCategoryDialogRef.close({
          element: this.productCategoryEl
        });
      }
    }
  }
}
