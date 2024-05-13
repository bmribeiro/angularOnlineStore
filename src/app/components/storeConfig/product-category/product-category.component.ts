import { Component, ViewChild } from '@angular/core';
import { ProductCategory, ProductCategoryImpl } from '../../../models/ProductCategory';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ProductCategoryService } from '../../../services/product-category.service';
import { take } from 'rxjs';
import { ProductCategoryDialogComponent } from '../../dialogs/product-category-dialog/product-category-dialog.component';
import { SizeCategory } from '../../../models/SizeCategory';
import { SizeCategoryService } from '../../../services/size-category.service';

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

  // Dialog Combo Field
  sizeCategories!: SizeCategory[];
  parentCategories!: ProductCategory[];

  constructor(
    private productCategoryService: ProductCategoryService,
    public productCategoryDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    public sizeCategoryService: SizeCategoryService) { }

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
  async openDialog(): Promise<void> {

    // SizeCategory & ParentProductCategory
    try {
      const dataSizeCategories = await this.sizeCategoryService.getSizeCategories().pipe(take(1)).toPromise();
      this.sizeCategories = dataSizeCategories as SizeCategory[];

      const dataParentCategories = await this.productCategoryService.getProductCategories().pipe(take(1)).toPromise();
      this.parentCategories = dataParentCategories as ProductCategory[];

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }

    const productCategoryDialogRef = this.productCategoryDialog.open(ProductCategoryDialogComponent, {
      data: {
        dataSizeCategories: this.sizeCategories,
        dataParentCategories: this.parentCategories
      }
    });

    productCategoryDialogRef.afterClosed().subscribe(result => {
      if (result
        && result.categoryName
        && result.categoryImage
        && result.categoryDescription
        && result.selectedSize
        && result.parentCategories) {

        const selectedSize = result.selectedSize;
        const selectedParentCategory = result.selectedParentCategory;

        // Category
        const category = new ProductCategoryImpl(
          null,
          result.categoryName,
          result.categoryImage,
          result.categoryDescription,
          selectedSize,
          selectedParentCategory
        );

        // File
        const file = result.file;

        this.productCategoryService.addProductCategory(category, file).subscribe(response => {

          this.productCategories.push(category);
          console.log('Marca adicionada com sucesso:', response);
        }, error => {
          console.error('Erro ao adicionar Categoria:', error);
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
