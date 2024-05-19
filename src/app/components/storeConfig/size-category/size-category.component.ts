import { Component, ViewChild } from '@angular/core';
import { SizeCategoryService } from '../../../services/size-category.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { SizeCategory, SizeCategoryImpl } from '../../../models/SizeCategory';
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

  displayedColumns: string[] = ['sizeCategoryName', 'edit', 'delete'];
  sizeCategories: SizeCategory[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sizeCategoriesSource!: MatTableDataSource<SizeCategory, MatPaginator>;

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
  async openDialog(sizeCategory: SizeCategory | null): Promise<void> {

    console.log(sizeCategory);

    const sizeCategoryDialogRef = this.sizeCategoryDialog.open(SizeCategoryDialogComponent, {
      data: {
        sizeCategory: sizeCategory ? sizeCategory : null
      }
    });

    sizeCategoryDialogRef.afterClosed().subscribe(result => {
      if (result && result.element) {

        // New SizeCategory
        if (result.element.attributeOptionId == null) {
          this.sizeCategoryService.addEl(result.element).subscribe(response => {
            this.sizeCategories.push(result.element);
            console.log('Opção Atributo adicionado com sucesso:', response);
          }, error => {
            console.error('Erro ao adicionar Opção Atributo:', error);
          });

          // Edit SizeCategory
        } else {

          console.log('Edit' + result.element);

          this.sizeCategoryService.updateEl(result.element).subscribe(response => {
            this.sizeCategories.push(result.element);
            console.log('Opção Atributo atualizado com sucesso:', response);
          }, error => {
            console.error('Erro ao atualizar Opção Atributo:', error);
          });
        }
      }
    });
  }

  // Editar
  editElement(element: SizeCategory) {
    if (element.sizeCategoryId !== null) {
      this.sizeCategoryService.editEl(element.sizeCategoryId).subscribe(response => {

        const attributeOption: SizeCategory = new SizeCategoryImpl(
          response.sizeCategoryId,
          response.sizeCategoryName
        );
        this.openDialog(attributeOption);
      });
    } else {
      console.error('O atributo optionId é nulo.');
    }
  }

  // Apagar
  deleteElement(element: SizeCategory) {
    if (element.sizeCategoryId !== null) {
      this.sizeCategoryService.deleteEl(element.sizeCategoryId).subscribe(response => {
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


