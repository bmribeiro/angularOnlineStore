import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductCategoryService } from '../../services/product-category.service';
import { ProductCategory } from '../../models/ProductCategory';
import { take } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  productCategories: ProductCategory[] = [];
  fatherChildrens: ProductCategory[] = [];

  @Output() menuItemSelected = new EventEmitter<ProductCategory>();

  constructor(private productCategoryService: ProductCategoryService) { }

  async ngOnInit(): Promise<void> {
    await this.loadParentCategories();
  }

  async loadParentCategories() {
    const criteria = {
      parentProductCategory: 'null'
    };
    const data = await this.productCategoryService.getProductCategories(criteria).pipe(take(1)).toPromise();
    this.productCategories = data as ProductCategory[];
  }

  async fathersChildren(productCategoryId: any) {
    const criteria = {
      parentProductCategoryId: productCategoryId
    };
    const data = await this.productCategoryService.getProductCategories(criteria).pipe(take(1)).toPromise();
    this.fatherChildrens = data as ProductCategory[];
    console.log(this.fatherChildrens);
  }

  selectMenuItem(item: ProductCategory): void {
    console.log(item);
    this.menuItemSelected.emit(item);
  }

}
