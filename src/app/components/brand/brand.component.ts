import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import {MatTableModule} from '@angular/material/table';
import { Brand } from '../../models/Brand';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
  standalone: true,
  imports: [MatTableModule]
})
export class BrandComponent implements OnInit{

  displayedColumns: string[] = ['brandName', 'brandDescription'];
  brands: Brand[] = [];

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
