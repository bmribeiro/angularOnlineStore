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

  displayedColumns: string[] = ['product', 'colour', 'originalPrice', 'salePrice', 'productCode', 'edit', 'delete'];
  productItems: ProductItem[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productItemsSource!: MatTableDataSource<ProductItem, MatPaginator>;

  // Dialog Combo Field
  products!: Product[];
  colours!: Colour[];

  constructor(
    private productItemService: ProductItemService,
    public productItemDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private productService: ProductService,
    private colourService: ColourService) { }

  async ngOnInit(): Promise<void> {
    await this.loadProductItems();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.productItemsSource = new MatTableDataSource<ProductItem>(this.productItems);
    this.productItemsSource.paginator = this.paginator;
    this.productItemsSource.sort = this.sort;
  }

  async loadProductItems(): Promise<void> {
    try {
      const data = await this.productItemService.getProductItems().pipe(take(1)).toPromise();
      this.productItems = data as ProductItem[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  async openDialog(productItem: ProductItem | null): Promise<void> {

    // ProductCategories & Brands
    try {
      const dataProducts = await this.productService.getProducts().pipe(take(1)).toPromise();
      this.products = dataProducts as Product[];

      const dataColours = await this.colourService.getColours().pipe(take(1)).toPromise();
      this.colours = dataColours as Colour[];

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }

    const productItemDialogRef = this.productItemDialog.open(ProductItemDialogComponent, {
      data: {
        products: this.products,
        colours: this.colours,
        productItem: productItem
      }
    });

    productItemDialogRef.afterClosed().subscribe(result => {
      if (result && result.element) {

        // File
        const file = result.element.file;

        // New ProductItem
        if (result.element.productItemId == null) {
          this.productItemService.addEl(result.element, file).subscribe(response => {
            this.productItems.push(result.element);
            console.log('Item adicionado com sucesso:', response);
          }, error => {
            console.error('Erro ao adicionar Item:', error);
          });

          // Edit ProductItem
        } else {

          console.log('Editar');

          this.productItemService.updateEl(result.element, file).subscribe(response => {
            this.productItems.push(result.element);
            console.log('Item atualizado com sucesso:', response);
          }, error => {
            console.error('Erro ao atualizar Item:', error);
          });
        }
      }
    });
  }

  // Editar
  editElement(element: ProductItem) {
    if (element.productItemId !== null) {
      this.productItemService.editEl(element.productItemId).subscribe(response => {

        const productItem: ProductItem = new ProductItemImpl(
          response.productItemId,
          response.product,
          response.colour,
          response.originalPrice,
          response.salePrice,
          response.productCode
        );
        this.openDialog(productItem);
      });
    } else {
      console.error('O Item é nulo.');
    }
  }

  // Apagar
  deleteElement(element: any) {
    if (element.attributeTypeId !== null) {
      this.productItemService.deleteEl(element.attributeTypeId).subscribe(response => {
        console.log('Elemento eliminado com sucesso', response);
      });
    }
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
