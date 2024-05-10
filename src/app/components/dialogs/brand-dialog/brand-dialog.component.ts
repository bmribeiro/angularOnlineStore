import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Brand } from '../../../models/Brand';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrl: './brand-dialog.component.css'
})
export class BrandDialogComponent {

  constructor(public brandDialogRef: MatDialogRef<BrandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Brand
  ) { }

  onNoClick(): void {
    this.brandDialogRef.close();
  }

}
