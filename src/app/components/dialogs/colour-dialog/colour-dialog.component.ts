import { Component, Inject } from '@angular/core';
import { Colour } from '../../../models/Colour';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-colour-dialog',
  templateUrl: './colour-dialog.component.html',
  styleUrl: './colour-dialog.component.css'
})
export class ColourDialogComponent {

  constructor(public brandDialogRef: MatDialogRef<ColourDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Colour
  ) { }

  onNoClick(): void {
    this.brandDialogRef.close();
  }

}
