import { Component, ViewChild } from '@angular/core';
import { Product } from '../../../models/Product';
import { MatSort, Sort } from '@angular/material/sort';
import { Brand } from '../../../models/Brand';
import { ProductService } from '../../../services/product.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductCategory } from '../../../models/ProductCategory';
import { take } from 'rxjs';
import { ProductDialogComponent } from '../../dialogs/product-dialog/product-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  displayedColumns: string[] = ['productCategory', 'brand', 'productImage', 'productDescription', 'careInstructions', 'about'];
  products: Product[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productsSource!: MatTableDataSource<Product, MatPaginator>;

  // Dialog Fields
  productCategory!: ProductCategory;
  brand!: Brand;
  productImage!: String;
  productDescription!: String;
  careInstructions!: String;
  about!: String;


  constructor(
    private productService: ProductService,
    public productDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.productsSource = new MatTableDataSource<Product>(this.products);
    this.productsSource.paginator = this.paginator;
    this.productsSource.sort = this.sort;
  }

  async loadProducts(): Promise<void> {
    try {
      const data = await this.productService.getProducts().pipe(take(1)).toPromise();
      this.products = data as Product[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  openDialog(): void {

    const productData: Product = {
      productId: null,
      productCategory: this.productCategory,
      brand: this.brand,
      productImage: this.productImage,
      productDescription: this.productDescription,
      careInstructions: this.careInstructions,
      about: this.about
    };

    const productDialogRef = this.productDialog.open(ProductDialogComponent, {
      data: productData,
    });

    productDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addProduct(productData).subscribe(response => {
          this.products.push(productData);
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
