import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/Brand';
import { MatDialog } from '@angular/material/dialog';
import { BrandDialogComponent } from '../dialog/brand-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { take } from 'rxjs';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['brandName', 'brandDescription'];
  brands: Brand[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  brandsSource!: MatTableDataSource<Brand, MatPaginator>;

  // Dialog Fields
  brandName!: string;
  brandDescription!: string;

  constructor(
    private brandService: BrandService,
    public brandDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadBrands();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.brandsSource = new MatTableDataSource<Brand>(this.brands);
    this.brandsSource.paginator = this.paginator;
    this.brandsSource.sort = this.sort;
  }

  async loadBrands(): Promise<void> {
    try {
      const data = await this.brandService.getBrands().pipe(take(1)).toPromise();
      this.brands = data as Brand[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  openDialog(): void {

    const brandData: Brand = {
      brandId: null,
      brandName: this.brandName,
      brandDescription: this.brandDescription
    };

    const brandDialogRef = this.brandDialog.open(BrandDialogComponent, {
      data: brandData,
    });

    brandDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.brandService.addBrand(brandData).subscribe(response => {
          this.brands.push(brandData);
          console.log('Marca adicionada com sucesso:', response);
        }, error => {
          console.error('Erro ao adicionar marca:', error);
        });
      }
    });
  }

  // Sort
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
