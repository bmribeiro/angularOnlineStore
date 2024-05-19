import { Component, Inject } from '@angular/core';
import { Colour } from '../../../models/Colour';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-colour-dialog',
  templateUrl: './colour-dialog.component.html',
  styleUrl: './colour-dialog.component.css'
})
export class ColourDialogComponent {

  // FormGroup
  formGroup!: FormGroup;

  // AttributeOption
  colourEl: Colour = {
    colourId: null,
    colourName: '',
    colourHex: ''
  };

  constructor(public brandDialogRef: MatDialogRef<ColourDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.colour != null) {

      // Edit Colour
      this.formGroup = new FormGroup({
        colourId: new FormControl(data.colour.colourId),
        colourName: new FormControl(data.colour.colourName, Validators.required),
        colourHex: new FormControl(data.colour.colourHex, Validators.required)
      });

      // New Colour
    } else {
      this.formGroup = new FormGroup({
        colourId: new FormControl(null),
        colourName: new FormControl(null, Validators.required),
        colourHex: new FormControl('', Validators.required)
      });
    }
  }

  onNoClick(): void {
    this.brandDialogRef.close();
  }

  confirm(): void {
    if (this.formGroup.valid) {
      const colourIdControl = this.formGroup.get('colourId');
      const colourNameControl = this.formGroup.get('colourName');
      const colourHexControl = this.formGroup.get('colourHex');

      if (colourNameControl && colourHexControl && colourNameControl.value && colourHexControl.value) {
        this.colourEl = {
          colourId: colourIdControl ? colourIdControl.value : null,
          colourName: colourNameControl.value,
          colourHex: colourHexControl.value
        };
        this.brandDialogRef.close({
          element: this.colourEl
        });
      }
    }
  }
}
