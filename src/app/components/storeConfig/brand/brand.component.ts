import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { Brand, BrandImpl } from '../../../models/Brand';
import { MatDialog } from '@angular/material/dialog';
import { BrandDialogComponent } from '../../dialogs/brand-dialog/brand-dialog.component';
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

  displayedColumns: string[] = ['brandName', 'brandDescription', 'edit', 'delete'];
  brands: Brand[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  brandsSource!: MatTableDataSource<Brand, MatPaginator>;

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
  async openDialog(brand: Brand | null): Promise<void> {

    console.log('Component' + JSON.stringify(brand));

    const brandDialogRef = this.brandDialog.open(BrandDialogComponent, {
      data: {
        brand: brand ? brand : null
      }
    });

    brandDialogRef.afterClosed().subscribe(result => {
      if (result && result.element) {

        // New Brand
        if (result.element.brandId == null) {
          this.brandService.addEl(result.element).subscribe(response => {
            this.brands.push(result.element);
            console.log('Marca adicionado com sucesso:', response);
          }, error => {
            console.error('Erro ao adicionar Marca:', error);
          });

          // Edit Brand
        } else {
          this.brandService.updateEl(result.element).subscribe(response => {
            this.brands.push(result.element);
            console.log('Marca atualizada com sucesso:', response);
          }, error => {
            console.error('Erro ao atualizar Marca:', error);
          });
        }
      }
    });
  }

  // Editar
  editElement(element: Brand) {
    if (element.brandId !== null) {
      this.brandService.editEl(element.brandId).subscribe(response => {

        const brand: Brand = new BrandImpl(
          response.brandId,
          response.brandName,
          response.brandDescription
        );
        this.openDialog(brand);
      });
    } else {
      console.error('O brandId é nulo.');
    }
  }

  // Apagar
  deleteElement(element: Brand) {
    if (element.brandId !== null) {
      this.brandService.deleteEl(element.brandId).subscribe(response => {
        console.log('Elemento eliminado com sucesso', response);
      });
    }
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
