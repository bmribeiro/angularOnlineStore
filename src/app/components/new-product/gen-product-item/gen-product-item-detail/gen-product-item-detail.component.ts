import { Component, Input } from '@angular/core';
import { ProductItem } from '../gen-product-item.component';
import { MatDialog } from '@angular/material/dialog';
import { GenImageDialogComponent } from '../gen-image-dialog/gen-image-dialog.component';
import { GenVariationDialogComponent } from '../gen-variation-dialog/gen-variation-dialog.component';

@Component({
  selector: 'app-gen-product-item-detail',
  templateUrl: './gen-product-item-detail.component.html',
  styleUrl: './gen-product-item-detail.component.css'
})
export class GenProductItemDetailComponent {

  @Input() productItemDetail: ProductItem | undefined;

  images: string[] = [];
  base64Images: string[] = [];

  constructor(
    public genImageDialog: MatDialog) { }

  openImageDialog() {
    const genImageDialogRef = this.genImageDialog.open(GenImageDialogComponent, {
      data: {}
    });

    genImageDialogRef.afterClosed().subscribe(result => {
      if (result && result.element instanceof File) {
        this.convertToBase64(result.element);
      } else {
        console.error('Invalid file:', result);
      }
    });
  }

  private convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Images.push(reader.result as string);
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
    reader.readAsDataURL(file);
  }

  
}
