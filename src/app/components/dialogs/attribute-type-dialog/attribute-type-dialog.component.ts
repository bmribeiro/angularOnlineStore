import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeType } from '../../../models/AttributeType';

@Component({
  selector: 'app-attribute-type-dialog',
  templateUrl: './attribute-type-dialog.component.html',
  styleUrl: './attribute-type-dialog.component.css'
})
export class AttributeTypeDialogComponent {

  constructor(public attributeTypeDialogRef: MatDialogRef<AttributeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AttributeType
  ) { }

  onNoClick(): void {
    this.attributeTypeDialogRef.close();
  }

}
