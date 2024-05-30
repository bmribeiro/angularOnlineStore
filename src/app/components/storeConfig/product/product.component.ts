import { Component, ViewChild } from '@angular/core';
import { Product, ProductImpl } from '../../../models/Product';
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
import { ProductCategoryService } from '../../../services/product-category.service';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  displayedColumns: string[] = ['productCategory', 'brand', 'productName', 'productDescription', 'careInstructions', 'about', 'edit', 'delete'];
  products: Product[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productsSource!: MatTableDataSource<Product, MatPaginator>;

  // Dialog Combo Field
  productCategories!: ProductCategory[];
  brands!: Brand[];

  constructor(
    private productService: ProductService,
    public productDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private productCategoryService: ProductCategoryService,
    private brandService: BrandService) { }

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
      console.error('Erro ao carregar Produtos:', error);
    }
  }

  // Dialog
  async openDialog(product: Product | null): Promise<void> {

    // ProductCategories & Brands
    try {
      const dataProductCategories = await this.productCategoryService.getProductCategories().pipe(take(1)).toPromise();
      this.productCategories = dataProductCategories as ProductCategory[];

      const dataBrands = await this.brandService.getBrands().pipe(take(1)).toPromise();
      this.brands = dataBrands as Brand[];

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }

    const productDialogRef = this.productDialog.open(ProductDialogComponent, {
      data: {
        dataProductCategories: this.productCategories,
        dataBrands: this.brands,
        product: product ? product : null
      },
    });

    productDialogRef.afterClosed().subscribe(result => {

      if (result && result.element) {

        // New Product
        if (result.element.productId == null) {
          this.productService.addEl(result.element).subscribe(response => {
            this.products.push(result.element);
            console.log('Produto adicionado com sucesso:', response);
          }, error => {
            console.error('Erro ao adicionar Produto:', error);
          });

          // Edit Product
        } else {
          this.productService.updateEl(result.element).subscribe(response => {
            this.products.push(result.element);
            console.log('Produto atualizado com sucesso:', response);
          }, error => {
            console.error('Erro ao atualizar Produto:', error);
          });
        }
      }
    });
  }

  // Editar
  editElement(element: Product) {
    if (element.productId !== null) {
      this.productService.editEl(element.productId).subscribe(response => {

        const product: Product = new ProductImpl(
          response.productId,
          response.productCategory,
          response.brand,
          response.productName,
          response.productDescription,
          response.careInstructions,
          response.about,
          response.productImages
        );
        this.openDialog(product);
      });
    } else {
      console.error('O productId é nulo.');
    }
  }

  // Apagar
  deleteElement(element: any) {
    if (element.attributeOptionId !== null) {
      this.productService.deleteEl(element.attributeOptionId).subscribe(response => {
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
