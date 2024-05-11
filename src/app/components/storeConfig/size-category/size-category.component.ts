import { Component, ViewChild } from '@angular/core';
import { SizeCategoryService } from '../../../services/size-category.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { SizeCategory } from '../../../models/SizeCategory';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { SizeCategoryDialogComponent } from '../../dialogs/size-category-dialog/size-category-dialog.component';

@Component({
  selector: 'app-size-category',
  templateUrl: './size-category.component.html',
  styleUrl: './size-category.component.css'
})
export class SizeCategoryComponent {

  displayedColumns: string[] = ['sizeCategoryName'];
  sizeCategories: SizeCategory[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sizeCategoriesSource!: MatTableDataSource<SizeCategory, MatPaginator>;

  // Dialog Fields
  sizeCategoryName!: string;

  constructor(
    private sizeCategoryService: SizeCategoryService,
    public sizeCategoryDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadSizeCategories();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.sizeCategoriesSource = new MatTableDataSource<SizeCategory>(this.sizeCategories);
    this.sizeCategoriesSource.paginator = this.paginator;
    this.sizeCategoriesSource.sort = this.sort;
  }

  // GET Size Categories
  async loadSizeCategories(): Promise<void> {
    try {
      const data = await this.sizeCategoryService.getSizeCategories().pipe(take(1)).toPromise();
      this.sizeCategories = data as SizeCategory[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  openDialog(): void {

    const sizeCategoryData: SizeCategory = {
      sizeCategoryId: null,
      sizeCategoryName: this.sizeCategoryName
    };

    const sizeCategoryDialogRef = this.sizeCategoryDialog.open(SizeCategoryDialogComponent, {
      data: sizeCategoryData,
    });

    sizeCategoryDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sizeCategoryService.addSizeCategory(sizeCategoryData).subscribe(response => {
          console.log(sizeCategoryData);
          this.sizeCategories.push(sizeCategoryData);
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


