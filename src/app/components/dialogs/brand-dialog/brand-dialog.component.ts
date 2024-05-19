import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Brand } from '../../../models/Brand';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrl: './brand-dialog.component.css'
})
export class BrandDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // Brand
  brandEl: Brand = {
    brandId: null,
    brandName: '',
    brandDescription: ''
  };

  constructor(public brandDialogRef: MatDialogRef<BrandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data.brand != null) {

      // Edition Brand
      this.formGroup = new FormGroup({
        brandId: new FormControl(data.brand.brandId),
        brandName: new FormControl(data.brand.brandName, Validators.required),
        brandDescription: new FormControl(data.brand.brandDescription, Validators.required)
      });

      // New Brand
    } else {
      this.formGroup = new FormGroup({
        brandId: new FormControl(null),
        brandName: new FormControl('', Validators.required),
        brandDescription: new FormControl('', Validators.required)
      });
    }
  }

  onNoClick(): void {
    this.brandDialogRef.close();
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const brandIdControl = this.formGroup.get('brandId');
      const brandNameControl = this.formGroup.get('brandName');
      const brandDescriptionControl = this.formGroup.get('brandDescription');

      if (brandNameControl && brandDescriptionControl && brandNameControl.value && brandDescriptionControl.value) {
        this.brandEl = {
          brandId: brandIdControl ? brandIdControl.value : null,
          brandName: brandNameControl.value,
          brandDescription: brandDescriptionControl.value
        };
        this.brandDialogRef.close({
          element: this.brandEl
        });
      }
    }
  }
}
