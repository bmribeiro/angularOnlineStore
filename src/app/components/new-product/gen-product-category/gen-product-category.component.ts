import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductCategoryService } from '../../../services/product-category.service';
import { take } from 'rxjs';
import { ProductCategory } from '../../../models/ProductCategory';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gen-product-category',
  templateUrl: './gen-product-category.component.html',
  styleUrl: './gen-product-category.component.css'
})
export class GenProductCategoryComponent implements OnInit {

  // Dialog ProductCategory
  productCategories: ProductCategory[] = [];

  // Selected ProductCategory
  productCategorySelected: ProductCategory | undefined;

  // Radio Selection
  selectedOption: string = 'select';

  @Output() productCategorySelectedEmitter = new EventEmitter<boolean>();

  constructor(
    private productCategoryService: ProductCategoryService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadProductCategory();
  }

  // GET Product Category
  async loadProductCategory(): Promise<void> {
    try {
      const dataProductCategory = await this.productCategoryService.getProductCategories().pipe(take(1)).toPromise();
      this.productCategories = dataProductCategory as ProductCategory[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  onProductCategorySelected(productCategory: ProductCategory) {
    this.productCategorySelected = productCategory;
    this.productCategorySelectedEmitter.emit(true);
  }

  // Option Select
  onOptionChange(event: any) {
    this.selectedOption = event.value;
  }

  newCategory(){

  }
}
