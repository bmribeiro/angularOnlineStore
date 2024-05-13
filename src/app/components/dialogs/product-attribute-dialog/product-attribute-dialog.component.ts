import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeType } from '../../../models/AttributeType';
import { AttributeTypeDialogComponent } from '../attribute-type-dialog/attribute-type-dialog.component';

@Component({
  selector: 'app-product-attribute-dialog',
  templateUrl: './product-attribute-dialog.component.html',
  styleUrl: './product-attribute-dialog.component.css'
})
export class ProductAttributeDialogComponent {
  constructor(public attributeTypeDialogRef: MatDialogRef<AttributeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AttributeType
  ) { }

  onNoClick(): void {
    this.attributeTypeDialogRef.close();
  }
}