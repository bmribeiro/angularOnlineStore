import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeType } from '../../../models/AttributeType';
import { AttributeOption } from '../../../models/AttributeOption';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-attribute-option-dialog',
  templateUrl: './attribute-option-dialog.component.html',
  styleUrl: './attribute-option-dialog.component.css'
})
export class AttributeOptionDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // AttributeTypes
  attributeTypes: AttributeType[];

  // AttributeOption
  attributeOptionEl: AttributeOption = {
    attributeOptionId: null,
    attributeType: null,
    attributeOptionName: ''
  };

  constructor(public attributeOptionDialogRef: MatDialogRef<AttributeOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.attributeTypes = data.attributeTypes;

    if (data.attributeOption != null) {

      // Edição AttributeOption
      this.formGroup = new FormGroup({
        attributeOptionId: new FormControl(data.attributeOption.attributeOptionId),
        attributeType: new FormControl(data.attributeOption.attributeType, Validators.required),
        attributeOptionName: new FormControl(data.attributeOption.attributeOptionName, Validators.required)
      });

      // Novo AttributeOption
    } else {
      this.formGroup = new FormGroup({
        attributeOptionId: new FormControl(null),
        attributeType: new FormControl(null, Validators.required),
        attributeOptionName: new FormControl('', Validators.required)
      });
    }
  }

  compareFunction(el1: AttributeType, el2: AttributeType): boolean {
    if (el2 != null) {
      return el1 && el2 ? el1.attributeTypeId === el2.attributeTypeId : el1 === el2;
    } else
      return false;
  }

  onNoClick(): void {
    this.attributeOptionDialogRef.close();
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const attributeOptionIdControl = this.formGroup.get('attributeOptionId');
      const attributeTypeControl = this.formGroup.get('attributeType');
      const attributeOptionNameControl = this.formGroup.get('attributeOptionName');

      if (attributeTypeControl && attributeOptionNameControl && attributeTypeControl.value && attributeOptionNameControl.value) {
        this.attributeOptionEl = {
          attributeOptionId: attributeOptionIdControl ? attributeOptionIdControl.value : null,
          attributeType: attributeTypeControl.value,
          attributeOptionName: attributeOptionNameControl.value
        };
        this.attributeOptionDialogRef.close({
          element: this.attributeOptionEl
        });
      }
    }
  }
}
