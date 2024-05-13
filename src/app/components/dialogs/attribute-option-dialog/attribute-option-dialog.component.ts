import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeType } from '../../../models/AttributeType';

@Component({
  selector: 'app-attribute-option-dialog',
  templateUrl: './attribute-option-dialog.component.html',
  styleUrl: './attribute-option-dialog.component.css'
})
export class AttributeOptionDialogComponent {

  // Attribute Type
  attributeTypes: AttributeType[];
  selectedAttributeType: AttributeType | undefined;

  // Dialog Field
  attributeOptionName!: string;

  constructor(public attributeOptionDialogRef: MatDialogRef<AttributeOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.attributeTypes = data.attributeTypes;
  }

  onNoClick(): void {
    this.attributeOptionDialogRef.close();
  }

  confirm(): void {
    this.attributeOptionDialogRef.close({
      selectedAttributeType: this.selectedAttributeType,
      attributeOptionName: this.attributeOptionName
    });
  }
}
