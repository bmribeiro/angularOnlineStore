import { Component, ViewChild } from '@angular/core';
import { AttributeType } from '../../../models/AttributeType';
import { AttributeOptionService } from '../../../services/attribute-option.service';
import { AttributeOption, AttributeOptionImpl } from '../../../models/AttributeOption';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AttributeOptionDialogComponent } from '../../dialogs/attribute-option-dialog/attribute-option-dialog.component';
import { AttributeTypeService } from '../../../services/attribute-type.service';

@Component({
  selector: 'app-attribute-option',
  templateUrl: './attribute-option.component.html',
  styleUrl: './attribute-option.component.css'
})
export class AttributeOptionComponent {

  displayedColumns: string[] = ['attributeType', 'attributeOptionName', 'edit', 'delete'];
  attributeOptions: AttributeOption[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  attributeOptionsSource!: MatTableDataSource<AttributeOption, MatPaginator>;

  // Dialog Combo Field
  attributeTypes!: AttributeType[];

  constructor(
    private attributeOptionService: AttributeOptionService,
    private attributeTypeService: AttributeTypeService,
    public attributeOptionDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadAttributeOptions();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.attributeOptionsSource = new MatTableDataSource<AttributeOption>(this.attributeOptions);
    this.attributeOptionsSource.paginator = this.paginator;
    this.attributeOptionsSource.sort = this.sort;
  }

  async loadAttributeOptions(): Promise<void> {
    try {
      const data = await this.attributeOptionService.getAttributeOptions().pipe(take(1)).toPromise();
      this.attributeOptions = data as AttributeOption[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  async openDialog(attributeOption: AttributeOption | null): Promise<void> {

    // AttributeTypes
    try {
      const data = await this.attributeTypeService.getAttributeTypes().pipe(take(1)).toPromise();
      this.attributeTypes = data as AttributeType[];
    } catch (error) {
      console.error('Erro ao carregar atributos:', error);
    }

    const attributeOptionDialogRef = this.attributeOptionDialog.open(AttributeOptionDialogComponent, {
      data: {
        attributeTypes: this.attributeTypes,
        attributeOption: attributeOption ? attributeOption : null
      }
    });

    attributeOptionDialogRef.afterClosed().subscribe(result => {
      if (result && result.element) {

        // New AttributeOption
        if (result.element.attributeOptionId == null) {
          this.attributeOptionService.addAttributeOption(result.element).subscribe(response => {
            this.attributeOptions.push(result.element);
            console.log('Opção Atributo adicionado com sucesso:', response);
          }, error => {
            console.error('Erro ao adicionar Opção Atributo:', error);
          });

          // Edit AttributeOption
        } else {
          this.attributeOptionService.updateAttributeOption(result.element).subscribe(response => {
            this.attributeOptions.push(result.element);
            console.log('Opção Atributo atualizado com sucesso:', response);
          }, error => {
            console.error('Erro ao atualizar Opção Atributo:', error);
          });
        }
      }
    });
  }

  editElement(element: AttributeOption) {
    if (element.attributeOptionId !== null) {
      this.attributeOptionService.editElement(element.attributeOptionId).subscribe(response => {

        const attributeOption: AttributeOption = new AttributeOptionImpl(
          response.attributeOptionId,
          response.attributeType,
          response.attributeOptionName
        );
        this.openDialog(attributeOption);
      });
    } else {
      console.error('O atributo optionId é nulo.');
    }
  }

  deleteElement(element: any) {
    if (element.attributeOptionId !== null) {
      this.attributeOptionService.deleteAttributeOption(element.attributeOptionId).subscribe(response => {
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
