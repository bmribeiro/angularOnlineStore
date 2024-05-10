import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from '../../../models/Brand';
import { SizeCategory } from '../../../models/SizeCategory';

@Component({
  selector: 'app-size-category-dialog',
  templateUrl: './size-category-dialog.component.html',
  styleUrl: './size-category-dialog.component.css'
})
export class SizeCategoryDialogComponent {

  constructor(public sizeCategoryRef: MatDialogRef<SizeCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SizeCategory
  ) { }

  onNoClick(): void {
    this.sizeCategoryRef.close();
  }


}
