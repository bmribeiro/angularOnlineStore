import { Component, ViewChild } from '@angular/core';
import { ProductAttribute, ProductAttributeImpl } from '../../../models/ProductAttribute';
import { AttributeOption } from '../../../models/AttributeOption';
import { Product } from '../../../models/Product';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { ProductAttributeService } from '../../../services/product-attribute.service';
import { ProductAttributeDialogComponent } from '../../dialogs/product-attribute-dialog/product-attribute-dialog.component';
import { ProductService } from '../../../services/product.service';
import { AttributeOptionService } from '../../../services/attribute-option.service';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrl: './product-attribute.component.css'
})
export class ProductAttributeComponent {

  displayedColumns: string[] = ['product', 'attributeOption', 'edit', 'delete'];
  productAttributes: ProductAttribute[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productAttributesSource!: MatTableDataSource<ProductAttribute, MatPaginator>;

  // Dialog Combo Field
  products!: Product[];
  attributeOptions!: AttributeOption[];

  constructor(
    private productAttributeService: ProductAttributeService,
    private productService: ProductService,
    private attributeOptionService: AttributeOptionService,
    public productAttributeDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this.loadProductAttributes();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();

    this.productAttributesSource = new MatTableDataSource<ProductAttribute>(this.productAttributes);
    this.productAttributesSource.paginator = this.paginator;
    this.productAttributesSource.sort = this.sort;
  }

  async loadProductAttributes(): Promise<void> {
    try {
      const data = await this.productAttributeService.getProductAttributes().pipe(take(1)).toPromise();
      this.productAttributes = data as ProductAttribute[];
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }

  // Dialog
  async openDialog(productAttribute: ProductAttribute | null): Promise<void> {

    // AttributeTypes
    try {
      const dataProducts = await this.productService.getProducts().pipe(take(1)).toPromise();
      this.products = dataProducts as Product[];

      const dataAttributeOption = await this.attributeOptionService.getAttributeOptions().pipe(take(1)).toPromise();
      this.attributeOptions = dataAttributeOption as AttributeOption[];

    } catch (error) {
      console.error('Erro ao carregar atributos:', error);
    }

    const productAttributeDialogRef = this.productAttributeDialog.open(ProductAttributeDialogComponent, {
      data: {
        products: this.products,
        attributeOptions: this.attributeOptions,
        productAttribute: productAttribute ? productAttribute : null
      }
    });

    productAttributeDialogRef.afterClosed().subscribe(result => {

      if (result && result.element) {

        // New AttributeOption
        if (result.element.attributeOptionId == null) {
          this.productAttributeService.addEl(result.element).subscribe(response => {
            this.attributeOptions.push(result.element);
            console.log('Opção Atributo adicionado com sucesso:', response);
          }, error => {
            console.error('Erro ao adicionar Opção Atributo:', error);
          });

          // Edit AttributeOption
        } else {
          this.productAttributeService.updateEl(result.element).subscribe(response => {
            this.attributeOptions.push(result.element);
            console.log('Opção Atributo atualizado com sucesso:', response);
          }, error => {
            console.error('Erro ao atualizar Opção Atributo:', error);
          });
        }
      }
    });
  }

  // Editar
  editElement(element: ProductAttribute) {
    if (element.productAttributeId !== null) {
      this.productAttributeService.editEl(element.productAttributeId).subscribe(response => {

        const sizeOption: ProductAttribute = new ProductAttributeImpl(
          response.productAttributeId,
          response.product,
          response.attributeOption,
        );
        this.openDialog(sizeOption);
      });
    } else {
      console.error('O atributo sizeOptionId é nulo.');
    }
  }

  // Apagar
  deleteElement(element: any) {
    if (element.productAttributeId !== null) {
      this.productAttributeService.deleteEl(element.productAttributeId).subscribe(response => {
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
