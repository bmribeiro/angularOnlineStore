import { Component } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {

  showGenProduct: boolean = false;

  showGenProductItem: boolean = false;

  onProductCategorySelected(toShowGenProduct: boolean) {
    this.showGenProduct = toShowGenProduct;
  }

  onProductSelected(showGenProductItem: boolean) {
    this.showGenProductItem = showGenProductItem;
  }

}
