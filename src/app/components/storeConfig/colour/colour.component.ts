import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Colour, ColourImpl } from '../../../models/Colour';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { ColourService } from '../../../services/colour.service';
import { ColourDialogComponent } from '../../dialogs/colour-dialog/colour-dialog.component';

@Component({
  selector: 'app-colour',
  templateUrl: './colour.component.html',
  styleUrl: './colour.component.css'
})
export class ColourComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['colourName', 'colourHex', 'edit', 'delete'];
  colours: Colour[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  coloursSource!: MatTableDataSource<Colour, MatPaginator>;

  constructor(
    private colourService: ColourService,
    public colourDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadColours();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.coloursSource = new MatTableDataSource<Colour>(this.colours);
    this.coloursSource.paginator = this.paginator;
    this.coloursSource.sort = this.sort;
  }

  async loadColours(): Promise<void> {
    try {
      const data = await this.colourService.getColours().pipe(take(1)).toPromise();
      this.colours = data as Colour[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  async openDialog(colour: Colour | null): Promise<void> {

    const colourDialogRef = this.colourDialog.open(ColourDialogComponent, {
      data: {
        colour: colour ? colour : null
      }
    });

    colourDialogRef.afterClosed().subscribe(result => {
      if (result && result.element) {

        console.log('Close' + result.element);

        // New Colour
        if (result.element.attributeOptionId == null) {
          this.colourService.addEl(result.element).subscribe(response => {
            this.colours.push(result.element);
            console.log('Cor adicionada com sucesso:', response);
          }, error => {
            console.error('Erro ao adicionar Cor:', error);
          });

          // Edit Colour
        } else {
          this.colourService.updateEl(result.element).subscribe(response => {
            this.colours.push(result.element);
            console.log('Opção Atributo atualizado com sucesso:', response);
          }, error => {
            console.error('Erro ao atualizar Cor:', error);
          });
        }

      }
    });
  }

  // Editar
  editElement(element: Colour) {
    if (element.colourId !== null) {
      this.colourService.editEl(element.colourId).subscribe(response => {

        const colour: Colour = new ColourImpl(
          response.colourId,
          response.colourName,
          response.colourHex
        );
        this.openDialog(colour);
      });
    } else {
      console.error('O colourId é nulo.');
    }
  }

  // Apagar
  deleteElement(element: any) {
    if (element.colourId !== null) {
      this.colourService.deleteEl(element.colourId).subscribe(response => {
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
