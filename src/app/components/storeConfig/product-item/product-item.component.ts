import { Component, ViewChild } from '@angular/core';
import { Product } from '../../../models/Product';
import { Colour } from '../../../models/Colour';
import { ProductItem, ProductItemImpl } from '../../../models/ProductItem';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { ProductItemService } from '../../../services/product-item.service';
import { ProductService } from '../../../services/product.service';
import { ColourService } from '../../../services/colour.service';
import { ProductItemDialogComponent } from '../../dialogs/product-item-dialog/product-item-dialog.component';

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

  // Dialog Combo Field
  products!: Product[];
  colours!: Colour[];

  constructor(
    private productItemService: ProductItemService,
    public brandDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private productService: ProductService,
    private colourService: ColourService) { }

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
  async openDialog(): Promise<void> {

    // ProductCategories & Brands
    try {
      const dataProducts = await this.productService.getProducts().pipe(take(1)).toPromise();
      this.products = dataProducts as Product[];

      const dataColours = await this.colourService.getColours().pipe(take(1)).toPromise();
      this.colours = dataColours as Colour[];

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }

    const productItemDialogRef = this.brandDialog.open(ProductItemDialogComponent, {
      data: {
        products: this.products,
        colours: this.colours
      }
    });

    productItemDialogRef.afterClosed().subscribe(result => {
      if (result
        && result.selectedProduct
        && result.selectedColour
        && result.originalPrice
        && result.salePrice
        && result.productCode) {

        const selectedProduct = result.selectedProduct;
        const selectedColour = result.selectedColour

        // Product Item
        const productItem = new ProductItemImpl(
          null,
          selectedProduct,
          selectedColour,
          result.originalPrice,
          result.salePrice,
          result.productCode
        );

        // File
        const file = result.file;

        this.productItemService.addProductItem(productItem, file).subscribe(response => {
          this.productItems.push(productItem);
          console.log('Marca adicionada com sucesso:', response);
        }, error => {
          console.error('Erro ao adicionar Item Produto:', error);
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
