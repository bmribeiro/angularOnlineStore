import { Component, ViewChild } from '@angular/core';
import { ProductVariationDialogComponent } from '../../dialogs/product-variation-dialog/product-variation-dialog.component';
import { ProductVariation, ProductVariationImpl } from '../../../models/ProductVariation';
import { ProductItem } from '../../../models/ProductItem';
import { SizeOption } from '../../../models/SizeOption';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { ProductVariationService } from '../../../services/product-variation.service';
import { ProductItemService } from '../../../services/product-item.service';
import { SizeOptionService } from '../../../services/size-option.service';

@Component({
  selector: 'app-product-variation',
  templateUrl: './product-variation.component.html',
  styleUrl: './product-variation.component.css'
})
export class ProductVariationComponent {

  displayedColumns: string[] = ['productItem', 'size', 'quantityInStock', 'edit', 'delete'];
  productVariations: ProductVariation[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productVariationsSource!: MatTableDataSource<ProductVariation, MatPaginator>;

  // Dialog Combo Field
  productItems!: ProductItem[];
  sizeOptions!: SizeOption[];

  constructor(
    private productVariationService: ProductVariationService,
    private productItemService: ProductItemService,
    private sizeOptionService: SizeOptionService,
    public productVariationDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadProductVariations();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.productVariationsSource = new MatTableDataSource<ProductVariation>(this.productVariations);
    this.productVariationsSource.paginator = this.paginator;
    this.productVariationsSource.sort = this.sort;
  }

  async loadProductVariations(): Promise<void> {
    try {
      const data = await this.productVariationService.getProductVariations().pipe(take(1)).toPromise();
      this.productVariations = data as ProductVariation[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  async openDialog(productVariation: ProductVariation | null): Promise<void> {

    // ProductItems
    try {
      const data = await this.productItemService.getProductItems().pipe(take(1)).toPromise();
      this.productItems = data as ProductItem[];
    } catch (error) {
      console.error('Erro ao carregar ProductItem:', error);
    }

    // SizeOptions
    try {
      const data = await this.sizeOptionService.getSizeOptions().pipe(take(1)).toPromise();
      this.sizeOptions = data as SizeOption[];
    } catch (error) {
      console.error('Erro ao carregar SizeOption:', error);
    }

    const productVariationDialogRef = this.productVariationDialog.open(ProductVariationDialogComponent, {
      data: {
        productItems: this.productItems,
        sizeOptions: this.sizeOptions,
        productVariation: productVariation ? productVariation : null
      }
    });

    productVariationDialogRef.afterClosed().subscribe(result => {
      if (result && result.element) {

        // New AttributeOption
        if (result.element.productVariationId == null) {
          this.productVariationService.addEl(result.element).subscribe(response => {
            this.productVariations.push(result.element);
            console.log('Variação adicionado com sucesso:', response);
          }, error => {
            console.error('Erro ao adicionar Variação:', error);
          });

          // Edit AttributeOption
        } else {
          this.productVariationService.updateEl(result.element).subscribe(response => {
            this.productVariations.push(result.element);
            console.log('Opção Atributo atualizado com sucesso:', response);
          }, error => {
            console.error('Erro ao atualizar Opção Atributo:', error);
          });
        }
      }
    });
  }

  // Editar
  editElement(element: ProductVariation) {

    console.log(element.productVariationId);

    if (element.productVariationId !== null) {
      this.productVariationService.editEl(element.productVariationId).subscribe(response => {

        const productVariation: ProductVariation = new ProductVariationImpl(
          response.productVariationId,
          response.productItem,
          response.size,
          response.qtyInStock
        );
        this.openDialog(productVariation);
      });
    } else {
      console.error('ProductVariation é nulo.');
    }
  }

  // Apagar
  deleteElement(element: any) {
    if (element.productVariationId !== null) {
      this.productVariationService.deleteEl(element.productVariationId).subscribe(response => {
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
