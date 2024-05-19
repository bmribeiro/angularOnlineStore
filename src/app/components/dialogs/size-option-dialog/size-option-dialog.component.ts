import { Component, Inject } from '@angular/core';
import { SizeCategory } from '../../../models/SizeCategory';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SizeOption } from '../../../models/SizeOption';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-size-option-dialog',
  templateUrl: './size-option-dialog.component.html',
  styleUrl: './size-option-dialog.component.css'
})
export class SizeOptionDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // AttributeTypes
  sizeCategories: SizeCategory[];

  // SizeOption
  sizeOptionEl: SizeOption = {
    sizeOptionId: null,
    sizeName: '',
    sortOrder: 0,
    sizeCategory: null
  };

  constructor(public sizeOptionDialogRef: MatDialogRef<SizeOptionDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.sizeCategories = data.sizeCategories;

    if (data.sizeOption != null) {

      // Edição SizeOption
      this.formGroup = new FormGroup({
        sizeOptionId: new FormControl(data.sizeOption.sizeOptionId),
        sizeName: new FormControl(data.sizeOption.sizeName, Validators.required),
        sortOrder: new FormControl(data.sizeOption.sortOrder, Validators.required),
        sizeCategory: new FormControl(data.sizeOption.sizeCategory, Validators.required)
      });

      // Novo SizeOption
    } else {
      this.formGroup = new FormGroup({
        sizeOptionId: new FormControl(null),
        sizeName: new FormControl('', Validators.required),
        sortOrder: new FormControl('', Validators.required),
        sizeCategory: new FormControl('', Validators.required)
      });
    }
  }

  compareFunction(el1: SizeOption, el2: SizeOption): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.sizeOptionId === el2.sizeOptionId : el1 === el2;
    } else
      return false;
  }

  onNoClick(): void {
    this.sizeOptionDialogRef.close();
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const sizeOptionIdControl = this.formGroup.get('sizeOptionId');
      const sizeNameControl = this.formGroup.get('sizeName');
      const sortOrderControl = this.formGroup.get('sortOrder');
      const sizeCategoryControl = this.formGroup.get('sizeCategory');

      if (sizeNameControl && sortOrderControl && sizeCategoryControl
        && sizeNameControl.value && sortOrderControl.value && sizeCategoryControl.value) {
        this.sizeOptionEl = {
          sizeOptionId: sizeOptionIdControl ? sizeOptionIdControl.value : null,
          sizeName: sizeNameControl.value,
          sortOrder: sortOrderControl.value,
          sizeCategory: sizeCategoryControl ? sizeCategoryControl.value : null,
        };
        this.sizeOptionDialogRef.close({
          element: this.sizeOptionEl
        });
      }
    }
  }

}
