import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ProductCategory } from '../models/ProductCategory';
import { ProductCategoryService } from '../services/product-category.service';
import { Router } from '@angular/router';
import { timeStamp } from 'console';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrl: './showroom.component.css'
})
export class ShowroomComponent {

  parentCategories: ProductCategory[] = [];

  constructor(
    private router: Router,
    private productCategoryService: ProductCategoryService,
  ) { }

  ngOnInit(): void {
    this.loadParentCategories()
  }

  async loadParentCategories() {
    const criteria = {
      parentProductCategory: 'null'
    };
    const data = await this.productCategoryService.getProductCategories(criteria).pipe(take(1)).toPromise();
    this.parentCategories = data as ProductCategory[];
    console.log(this.parentCategories);
  }

  onChild(category: ProductCategory) {
    this.router.navigate(['store/category', category.productCategoryId]);
    console.log('Child of Parent - ID: ' + category.productCategoryId)
  }
}
