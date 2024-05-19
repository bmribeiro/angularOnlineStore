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

  displayedColumns: string[] = ['categoryName', 'categoryImage', 'categoryDescription', 'sizeCategory', 'parentProductCategory', 'edit', 'delete'];
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
  async openDialog(productCategory: ProductCategory | null): Promise<void> {

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
        sizeCategories: this.sizeCategories,
        parentCategories: this.parentCategories,
        productCategory: productCategory
      },
      minWidth: '50vw'
    });

    productCategoryDialogRef.afterClosed().subscribe(result => {
      if (result && result.element) { 

        // File
        const file = result.element.file;
        console.log(file);

        // New ProductCategory
        if (result.element.productCategoryId == null) {
          this.productCategoryService.addEl(result.element, file).subscribe(response => {
            this.productCategories.push(result.element);
            console.log('Categoria adicionada com sucesso:', response);
          }, error => {
            console.error('Erro ao adicionar Categoria:', error);
          });

          // Edit ProductCategory
        } else {
          this.productCategoryService.updateEl(result.element, file).subscribe(response => {
            this.productCategories.push(result.element);
            console.log('Categoria atualizado com sucesso:', response);
          }, error => {
            console.error('Erro ao atualizar Categoria:', error);
          });
        }
      }
    });
  }

  // Editar
  editElement(element: ProductCategory) {
    if (element.productCategoryId !== null) {
      this.productCategoryService.editEl(element.productCategoryId).subscribe(response => {

        const productCategory: ProductCategory = new ProductCategoryImpl(
          response.productCategoryId,
          response.categoryName,
          response.categoryImage,
          response.imageBytes,
          response.categoryDescription,
          response.sizeCategory,
          response.parentProductCategory
        );
        this.openDialog(productCategory);
      });
    } else {
      console.error('O productCategoryId é nulo.');
    }
  }

  // Apagar
  deleteElement(element: any) {
    if (element.productCategoryId !== null) {
      this.productCategoryService.deleteEl(element.productCategoryId).subscribe(response => {
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
