import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeType } from '../../../models/AttributeType';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attribute-type-dialog',
  templateUrl: './attribute-type-dialog.component.html',
  styleUrl: './attribute-type-dialog.component.css'
})
export class AttributeTypeDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // AttributeType
  attributeTypeEl: AttributeType = {
    attributeTypeId: null,
    attributeName: ''
  };

  constructor(public attributeTypeDialogRef: MatDialogRef<AttributeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data.attributeType != null) {

      // Edição AttributeType
      this.formGroup = new FormGroup({
        attributeTypeId: new FormControl(data.attributeType.attributeTypeId),
        attributeName: new FormControl(data.attributeType.attributeName, Validators.required)
      });

      // Novo AttributeType
    } else {
      this.formGroup = new FormGroup({
        attributeTypeId: new FormControl(null),
        attributeName: new FormControl('', Validators.required),
      });
    }
  }

  onNoClick(): void {
    this.attributeTypeDialogRef.close();
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const attributeTypeIdControl = this.formGroup.get('attributeTypeId');
      const attributeNameControl = this.formGroup.get('attributeName');

      if (attributeNameControl && attributeNameControl.value) {
        this.attributeTypeEl = {
          attributeTypeId: attributeTypeIdControl ? attributeTypeIdControl.value : null,
          attributeName: attributeNameControl.value,
        };
        this.attributeTypeDialogRef.close({
          element: this.attributeTypeEl
        });
      }
    }
  }
}
