import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from '../../../models/Brand';
import { SizeCategory } from '../../../models/SizeCategory';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-size-category-dialog',
  templateUrl: './size-category-dialog.component.html',
  styleUrl: './size-category-dialog.component.css'
})
export class SizeCategoryDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // AttributeOption
  sizeCategoryEl: SizeCategory = {
    sizeCategoryId: null,
    sizeCategoryName: ''
  };

  constructor(public sizeCategoryRef: MatDialogRef<SizeCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data.sizeCategory != null) {

      // Edição SizeCategory
      this.formGroup = new FormGroup({
        sizeCategoryId: new FormControl(data.sizeCategory.sizeCategoryId),
        sizeCategoryName: new FormControl(data.sizeCategory.sizeCategoryName, Validators.required),
      });

      // Novo SizeCategory
    } else {
      this.formGroup = new FormGroup({
        sizeCategoryId: new FormControl(null),
        sizeCategoryName: new FormControl('', Validators.required),
      });
    }
  }

  onNoClick(): void {
    this.sizeCategoryRef.close();
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const sizeCategoryIdControl = this.formGroup.get('sizeCategoryId');
      const sizeCategoryNameControl = this.formGroup.get('sizeCategoryName');

      if (sizeCategoryNameControl && sizeCategoryNameControl.value) {
        this.sizeCategoryEl = {
          sizeCategoryId: sizeCategoryIdControl ? sizeCategoryIdControl.value : null,
          sizeCategoryName: sizeCategoryNameControl.value
        };
        this.sizeCategoryRef.close({
          element: this.sizeCategoryEl
        });
      }
    }
  }
}
