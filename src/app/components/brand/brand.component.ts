import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit{

  brands: any[] = [];

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data;
    });
  }
  

}
