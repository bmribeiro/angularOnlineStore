import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../models/ProductCategory';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {

  selectedMenuItem: ProductCategory | undefined;

  constructor() {
    this.selectedMenuItem = undefined;
  }

  ngOnInit(): void {
  }

  onMenuItemSelected(item: ProductCategory): void {
    console.log('Father' + item);
    this.selectedMenuItem = item;
  }

}
