import { Component, ViewChild } from '@angular/core';
import { AttributeType } from '../../../models/AttributeType';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AttributeTypeService } from '../../../services/attribute-type.service';
import { AttributeTypeDialogComponent } from '../../dialogs/attribute-type-dialog/attribute-type-dialog.component';

@Component({
  selector: 'app-attribute-type',
  templateUrl: './attribute-type.component.html',
  styleUrl: './attribute-type.component.css'
})

export class AttributeTypeComponent {

  displayedColumns: string[] = ['attributeName'];
  attributeTypes: AttributeType[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  attributeTypesSource!: MatTableDataSource<AttributeType, MatPaginator>;

  // Dialog Fields
  attributeName!: string;

  constructor(
    private attributeTypeService: AttributeTypeService,
    public attributeTypeDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadAttributeTypes();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.attributeTypesSource = new MatTableDataSource<AttributeType>(this.attributeTypes);
    this.attributeTypesSource.paginator = this.paginator;
    this.attributeTypesSource.sort = this.sort;
  }

  async loadAttributeTypes(): Promise<void> {
    try {
      const data = await this.attributeTypeService.getAttributeTypes().pipe(take(1)).toPromise();
      this.attributeTypes = data as AttributeType[];
    } catch (error) {
      console.error('Erro ao carregar atributos:', error);
    }
  }

  // Dialog
  openDialog(): void {

    const attributeTypeData: AttributeType = {
      attributeTypeId: null,
      attributeName: this.attributeName,
    };

    const attributeTypeDialogRef = this.attributeTypeDialog.open(AttributeTypeDialogComponent, {
      data: attributeTypeData,
    });

    attributeTypeDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attributeTypeService.addAttributeType(attributeTypeData).subscribe(response => {
          this.attributeTypes.push(attributeTypeData);
          console.log('Atributo adicionado com sucesso:', response);
        }, error => {
          console.error('Erro ao adicionar atributo:', error);
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
