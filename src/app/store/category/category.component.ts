import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryService } from '../../services/product-category.service';
import { take } from 'rxjs';
import { ProductCategory } from '../../models/ProductCategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  selectedCategoryId: number | null = null;
  childCategories: ProductCategory[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private productCategoryService: ProductCategoryService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.selectedCategoryId = +id;
        this.fetchCategory();
      }
    });
  }

  async fetchCategory() {
    if (this.selectedCategoryId !== null) {
      const criteria = {
        parentProductCategoryId: this.selectedCategoryId
      };
      const data = await this.productCategoryService.getProductCategories(criteria).pipe(take(1)).toPromise();
      this.childCategories = data as ProductCategory[];

      console.log('Childs of Category: ' + this.selectedCategoryId);
    }
  }

  async onChild(element: ProductCategory) {

    const criteria = {
      parentProductCategoryId: element.productCategoryId
    };

    const data = await this.productCategoryService.getProductCategories(criteria).pipe(take(1)).toPromise();

    if (data!.length > 0) {
      this.childCategories = data as ProductCategory[];
    } else {
      this.router.navigate(['store/products', element.productCategoryId]);
    }

  }
}
