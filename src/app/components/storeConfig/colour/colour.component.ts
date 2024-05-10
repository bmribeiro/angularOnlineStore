import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Colour } from '../../../models/Colour';
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

  displayedColumns: string[] = ['colourName', 'colourHex'];
  colours: Colour[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  coloursSource!: MatTableDataSource<Colour, MatPaginator>;

  // Dialog Fields
  colourName!: string;
  colourHex!: string;

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
  openDialog(): void {

    const colourData: Colour = {
      colourId: null,
      colourName: this.colourName,
      colourHex: this.colourHex
    };

    const colourDialogRef = this.colourDialog.open(ColourDialogComponent, {
      data: colourData,
    });

    colourDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.colourService.addColour(colourData).subscribe(response => {
          this.colours.push(colourData);
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
