import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gen-image-dialog',
  templateUrl: './gen-image-dialog.component.html',
  styleUrl: './gen-image-dialog.component.css'
})
export class GenImageDialogComponent {

  // File
  fileName = '';
  file: File | undefined;

  constructor(public getImageDialogRef: MatDialogRef<GenImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  submitDialog(): void {
    console.log(this.file);

    this.getImageDialogRef.close({
      element: this.file
    });
  }

  cancelDialog(): void {
    this.getImageDialogRef.close();
  }
}
