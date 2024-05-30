import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  selectedCategoryId: number | null = null;
  products: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.selectedCategoryId = +id;
        this.loadProducts()
      }
    });
  }
  
  async loadProducts() {
    if (this.selectedCategoryId !== null) {

      console.log(this.selectedCategoryId);

      const data = await this.productService.getProductsByCategory(this.selectedCategoryId).pipe(take(1)).toPromise();
      this.products = data as Product[];
    }
  }

  detail(product: any){
    this.router.navigate(['store/productDetail', product.productId]);
  }

}
