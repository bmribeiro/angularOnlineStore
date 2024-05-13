import { Component, ViewChild } from '@angular/core';
import { SizeOption } from '../../../models/SizeOption';
import { SizeCategory } from '../../../models/SizeCategory';
import { SizeOptionDialogComponent } from '../../dialogs/size-option-dialog/size-option-dialog.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { SizeOptionService } from '../../../services/size-option.service';

@Component({
  selector: 'app-size-option',
  templateUrl: './size-option.component.html',
  styleUrl: './size-option.component.css'
})
export class SizeOptionComponent {

  displayedColumns: string[] = ['sizeName', 'sortOrder', 'sizeCategory'];
  sizeOptions: SizeOption[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sizeOptionsSource!: MatTableDataSource<SizeOption, MatPaginator>;

  // Dialog Fields
  sizeName!: string;
  sortOrder!: number;
  sizeCategory!: SizeCategory

  constructor(
    private sizeOptionService: SizeOptionService,
    public brandDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadSizeOptions();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.sizeOptionsSource = new MatTableDataSource<SizeOption>(this.sizeOptions);
    this.sizeOptionsSource.paginator = this.paginator;
    this.sizeOptionsSource.sort = this.sort;
  }

  async loadSizeOptions(): Promise<void> {
    try {
      const data = await this.sizeOptionService.getSizeOptions().pipe(take(1)).toPromise();
      this.sizeOptions = data as SizeOption[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  openDialog(): void {

    const sizeOptionData: SizeOption = {
      sizeOptionId: null,
      sizeName: this.sizeName,
      sortOrder: this.sortOrder,
      sizeCategory: this.sizeCategory
    };

    const sizeOptionDialogRef = this.brandDialog.open(SizeOptionDialogComponent, {
      data: sizeOptionData,
    });

    sizeOptionDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sizeOptionService.addSizeOption(sizeOptionData).subscribe(response => {
          this.sizeOptions.push(sizeOptionData);
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
