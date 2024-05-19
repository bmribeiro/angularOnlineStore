import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductCategory } from '../../models/ProductCategory';
import { ProductCategoryService } from '../../services/product-category.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrl: './showroom.component.css'
})
export class ShowroomComponent implements OnInit {

  // From Menu
  @Input() selectedMenuItem: ProductCategory | undefined;
  
  // To Cards
  @Output() productsLoaded = new EventEmitter<ProductCategory[]>();

  productsCategory: ProductCategory[] | undefined;

  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    console.log('Component initialized');
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['selectedMenuItem']) {
      const newValueString = JSON.stringify(changes['selectedMenuItem'].currentValue);
      const newValueObject: ProductCategory = JSON.parse(newValueString);

      const previousValue = changes['selectedMenuItem'].previousValue;

      const criteria = {
        parentProductCategoryId: newValueObject.productCategoryId
      };

      const data = await this.productCategoryService.getProductCategories(criteria).pipe(take(1)).toPromise();
      this.productsCategory = data as ProductCategory[];

      this.productsLoaded.emit(this.productsCategory);
    }
  }


}
