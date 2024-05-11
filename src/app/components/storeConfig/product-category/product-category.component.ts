import { Component, ViewChild } from '@angular/core';
import { ProductCategory } from '../../../models/ProductCategory';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ProductCategoryService } from '../../../services/product-category.service';
import { take } from 'rxjs';
import { SizeCategory } from '../../../models/SizeCategory';
import { ProductCategoryDialogComponent } from '../../dialogs/product-category-dialog/product-category-dialog.component';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent {

  displayedColumns: string[] = ['categoryName', 'categoryImage', 'categoryDescription', 'sizeCategory', 'parentProductCategory'];
  productCategories: ProductCategory[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productCategoriesSource!: MatTableDataSource<ProductCategory, MatPaginator>;

  // Dialog Fields
  categoryName!: string;
  categoryImage!: File;
  categoryDescription!: string;
  sizeCategory!: SizeCategory;
  parentProductCategory!: ProductCategory;

  constructor(
    private productCategoryService: ProductCategoryService,
    public productCategoryDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadProductCategory();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.productCategoriesSource = new MatTableDataSource<ProductCategory>(this.productCategories);
    this.productCategoriesSource.paginator = this.paginator;
    this.productCategoriesSource.sort = this.sort;
  }

  // GET Product Category
  async loadProductCategory(): Promise<void> {
    try {
      const data = await this.productCategoryService.getProductCategories().pipe(take(1)).toPromise();
      this.productCategories = data as ProductCategory[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  openDialog(): void {

    const productCategoryData: ProductCategory = {
      productCategoryId: null,
      categoryName: this.categoryName,
      categoryImage: this.categoryImage,
      categoryDescription: this.categoryDescription,
      sizeCategory: this.sizeCategory,
      parentProductCategory: this.parentProductCategory
    };

    const productCategoryDialogRef = this.productCategoryDialog.open(ProductCategoryDialogComponent, {
      data: productCategoryData,
    });

    productCategoryDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productCategoryService.addProductCategory(productCategoryData).subscribe(response => {
          this.productCategories.push(productCategoryData);
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
