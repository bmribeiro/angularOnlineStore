import { Component, ViewChild } from '@angular/core';
import { ProductVariationDialogComponent } from '../../dialogs/product-variation-dialog/product-variation-dialog.component';
import { ProductVariation } from '../../../models/ProductVariation';
import { ProductItem } from '../../../models/ProductItem';
import { SizeOption } from '../../../models/SizeOption';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { ProductVariationService } from '../../../services/product-variation.service';

@Component({
  selector: 'app-product-variation',
  templateUrl: './product-variation.component.html',
  styleUrl: './product-variation.component.css'
})
export class ProductVariationComponent {

  displayedColumns: string[] = ['productItem', 'size', 'quantityInStock'];
  productVariations: ProductVariation[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productVariationsSource!: MatTableDataSource<ProductVariation, MatPaginator>;

  // Dialog Fields
  productItem!: ProductItem;
  size!: SizeOption;
  qtyInStock!: number;

  constructor(
    private productVariationService: ProductVariationService,
    public productVariationDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadProductVariations();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.productVariationsSource = new MatTableDataSource<ProductVariation>(this.productVariations);
    this.productVariationsSource.paginator = this.paginator;
    this.productVariationsSource.sort = this.sort;
  }

  async loadProductVariations(): Promise<void> {
    try {
      const data = await this.productVariationService.getProductVariations().pipe(take(1)).toPromise();
      this.productVariations = data as ProductVariation[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  openDialog(): void {

    const productVariationData: ProductVariation = {
      productVariationId: null,
      productItem: this.productItem,
      size: this.size,
      qtyInStock: this.qtyInStock
    };

    const productVariationDialogRef = this.productVariationDialog.open(ProductVariationDialogComponent, {
      data: productVariationData,
    });

    productVariationDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productVariationService.addProductVariation(productVariationData).subscribe(response => {
          this.productVariations.push(productVariationData);
          console.log('Marca adicionada com sucesso:', response);
        }, error => {
          console.error('Erro ao adicionar marca:', error);
        });
      }
    });
  }

  // Sort
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
