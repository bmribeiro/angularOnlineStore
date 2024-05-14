import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeType } from '../../../models/AttributeType';
import { AttributeOption } from '../../../models/AttributeOption';

@Component({
  selector: 'app-attribute-option-dialog',
  templateUrl: './attribute-option-dialog.component.html',
  styleUrl: './attribute-option-dialog.component.css'
})
export class AttributeOptionDialogComponent {

  // Attribute Type
  attributeTypes: AttributeType[];

  // AttributeOption
  element: AttributeOption = {
    attributeOptionId: null,
    attributeType: null,
    attributeOptionName: ''
  };

  constructor(public attributeOptionDialogRef: MatDialogRef<AttributeOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.attributeTypes = data.attributeTypes;
    if (data.attributeOption != null) {
      this.element = data.attributeOption;
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
    this.attributeOptionDialogRef.close({
      element: this.element
    });
  }
}
