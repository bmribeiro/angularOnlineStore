import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenVariationDialogComponent } from '../gen-variation-dialog/gen-variation-dialog.component';
import { SizeOption } from '../../../../models/SizeOption';
import { SizeOptionService } from '../../../../services/size-option.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-gen-product-item-variation',
  templateUrl: './gen-product-item-variation.component.html',
  styleUrl: './gen-product-item-variation.component.css'
})

export class GenProductItemVariationComponent {

  // Combo
  sizeOptions: SizeOption[] = []

  // OptionVariation
  genProductVariations : GenProductVariation[] = [];

  constructor(
    public genVariationDialog: MatDialog,
    private sizeOptionService: SizeOptionService
  ) { 
    this.loadSizeOptions();
  }

  openVariationDialog() {
    const genVariationDialogRef = this.genVariationDialog.open(GenVariationDialogComponent, {
      data: {
        sizeOptions: this.sizeOptions
      }
    });
    genVariationDialogRef.afterClosed().subscribe(result => {
      if (result){
        this.genProductVariations.push(result);
      }
      console.log(result);
    });
  }

  async loadSizeOptions(): Promise<void> {
    try {
      const data = await this.sizeOptionService.getSizeOptions().pipe(take(1)).toPromise();
      this.sizeOptions = data as SizeOption[];
    } catch (error) {
      console.error('Erro tamanhos:', error);
    }
  }
}

export interface GenProductVariation {
  size: SizeOption;
  qtyInStock: number
}
