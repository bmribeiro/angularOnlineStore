import { Component, ViewChild } from '@angular/core';
import { SizeOption, SizeOptionImpl } from '../../../models/SizeOption';
import { SizeCategory } from '../../../models/SizeCategory';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { SizeOptionService } from '../../../services/size-option.service';
import { SizeCategoryService } from '../../../services/size-category.service';
import { SizeOptionDialogComponent } from '../../dialogs/size-option-dialog/size-option-dialog.component';

@Component({
  selector: 'app-size-option',
  templateUrl: './size-option.component.html',
  styleUrl: './size-option.component.css'
})
export class SizeOptionComponent {

  displayedColumns: string[] = ['sizeName', 'sortOrder', 'sizeCategory', 'edit', 'delete'];
  sizeOptions: SizeOption[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sizeOptionsSource!: MatTableDataSource<SizeOption, MatPaginator>;

  // Dialog Combo Field
  sizeCategories!: SizeCategory[];

  constructor(
    private sizeOptionService: SizeOptionService,
    private sizeCategorogyService: SizeCategoryService,
    public sizeCategoryDialog: MatDialog,
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
  async openDialog(sizeOption: SizeOption | null): Promise<void> {

    // SizeCategory
    try {
      const data = await this.sizeCategorogyService.getSizeCategories().pipe(take(1)).toPromise();
      this.sizeCategories = data as SizeCategory[];
    } catch (error) {
      console.error('Erro ao carregar atributos:', error);
    }

    const sizeOptionDialogRef = this.sizeCategoryDialog.open(SizeOptionDialogComponent, {
      data: {
        sizeCategories: this.sizeCategories,
        sizeOption: sizeOption ? sizeOption : null
      }
    });

    sizeOptionDialogRef.afterClosed().subscribe(result => {
      if (result && result.element) {

        // New AttributeOption
        if (result.element.attributeOptionId == null) {
          this.sizeOptionService.addEl(result.element).subscribe(response => {
            this.sizeCategories.push(result.element);
            console.log('Opção Atributo adicionado com sucesso:', response);
          }, error => {
            console.error('Erro ao adicionar Opção Tamanho:', error);
          });

          // Edit AttributeOption
        } else {
          this.sizeOptionService.updateEl(result.element).subscribe(response => {
            this.sizeCategories.push(result.element);
            console.log('Opção Tamanho atualizado com sucesso:', response);
          }, error => {
            console.error('Erro ao atualizar Opção Tamanho:', error);
          });
        }
      }
    });
  }

  // Editar
  editElement(element: SizeOption) {
    if (element.sizeOptionId !== null) {
      this.sizeOptionService.editEl(element.sizeOptionId).subscribe(response => {

        const sizeOption: SizeOption = new SizeOptionImpl(
          response.sizeOptionId,
          response.sizeName,
          response.sortOrder,
          response.sizeCategory
        );
        this.openDialog(sizeOption);
      });
    } else {
      console.error('O atributo sizeOptionId é nulo.');
    }
  }

  // Apagar
  deleteElement(element: any) {


    console.log(element.sizeOptionId);

    if (element.sizeOptionId !== null) {
      this.sizeOptionService.deleteEl(element.sizeOptionId).subscribe(response => {
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
