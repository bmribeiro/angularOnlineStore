import { Component, ViewChild } from '@angular/core';
import { Product } from '../../../models/Product';
import { Colour } from '../../../models/Colour';
import { ProductItem } from '../../../models/ProductItem';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { BrandDialogComponent } from '../../dialogs/brand-dialog/brand-dialog.component';
import { ProductItemService } from '../../../services/product-item.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  displayedColumns: string[] = ['product', 'colour', 'originalPrice', 'salePrice', 'productCode'];
  productItems: ProductItem[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productItemsSource!: MatTableDataSource<ProductItem, MatPaginator>;

  // Dialog Fields
  product!: Product;
  colour!: Colour;
  originalPrice!: number;
  salePrice!: number;
  productCode!: string;

  constructor(
    private productItemService: ProductItemService,
    public brandDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadBrands();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.productItemsSource = new MatTableDataSource<ProductItem>(this.productItems);
    this.productItemsSource.paginator = this.paginator;
    this.productItemsSource.sort = this.sort;
  }

  async loadBrands(): Promise<void> {
    try {
      const data = await this.productItemService.getProductItems().pipe(take(1)).toPromise();
      this.productItems = data as ProductItem[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  openDialog(): void {

    const productItemData: ProductItem = {
      productItemId: null,
      product: this.product,
      colour: this.colour,
      originalPrice: this.originalPrice,
      salePrice: this.salePrice,
      productCode: this.productCode
    };

    const brandDialogRef = this.brandDialog.open(BrandDialogComponent, {
      data: productItemData,
    });

    brandDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productItemService.addProductItem(productItemData).subscribe(response => {
          this.productItems.push(productItemData);
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
