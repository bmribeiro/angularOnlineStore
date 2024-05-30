import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SizeOption } from '../../../../models/SizeOption';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenProductVariation } from '../gen-product-item-variation/gen-product-item-variation.component';

@Component({
  selector: 'app-gen-variation-dialog',
  templateUrl: './gen-variation-dialog.component.html',
  styleUrl: './gen-variation-dialog.component.css'
})
export class GenVariationDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // SizeOptions
  sizeOptions: SizeOption[] = [];

  constructor(
    public genVariationDialogRef: MatDialogRef<GenVariationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.sizeOptions = data.sizeOptions;

    this.formGroup = new FormGroup({
      'size': new FormControl('', Validators.required),
      'qtyInStock': new FormControl('', Validators.required),
    });

  }
  submitDialog(): void {
    if (this.formGroup.valid) {
      const newVariation: GenProductVariation = {
        size: this.formGroup.get('size')?.value,
        qtyInStock: this.formGroup.get('qtyInStock')?.value
      };
  
      this.genVariationDialogRef.close(newVariation);
    }
  }

  cancelDialog(): void {
    this.genVariationDialogRef.close();
  }
}
