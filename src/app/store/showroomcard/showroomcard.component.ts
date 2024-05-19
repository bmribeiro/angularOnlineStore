import { Component, Input, OnInit } from '@angular/core';
import { ProductCategory } from '../../models/ProductCategory';

@Component({
  selector: 'app-showroomcard',
  templateUrl: './showroomcard.component.html',
  styleUrl: './showroomcard.component.css'
})
export class ShowroomcardComponent implements OnInit{

  @Input() productCategory: ProductCategory | undefined;
  imageSrc: string | undefined;

  constructor() {
  }
  ngOnInit(): void {
    console.log(this.productCategory!.imageBytes);
    this.imageSrc = 'data:image/jpeg;base64,' + this.productCategory!.imageBytes;
  }



}
