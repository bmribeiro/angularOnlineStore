import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gen-product-item',
  templateUrl: './gen-product-item.component.html',
  styleUrl: './gen-product-item.component.css'
})
export class GenProductItemComponent {

  @Input() showGenProductItem: boolean = false;

  // FormGroup
  formGroup!: FormGroup;

  // Array
  productItems: ProductItem[] = [];


  constructor() {
    this.formGroup = new FormGroup({
      originalPrice: new FormControl(''),
      promoPrice: new FormControl(''),
      productCode: new FormControl('')
    });
  }


  createItem() {
    console.log(this.formGroup);

    const newProductItem: ProductItem = {
      originalPrice: this.formGroup.get('originalPrice')?.value,
      promoPrice: this.formGroup.get('promoPrice')?.value,
      productCode: this.formGroup.get('productCode')?.value
    };

    this.productItems.push(newProductItem);
  }
}


// Definindo a interface fora da classe
export interface ProductItem {
  originalPrice: string;
  promoPrice: string;
  productCode: string;
}
