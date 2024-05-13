import { Component, ViewChild } from '@angular/core';
import { ProductAttribute } from '../../../models/ProductAttribute';
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

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrl: './product-attribute.component.css'
})
export class ProductAttributeComponent {

  displayedColumns: string[] = ['product', 'attributeOption'];
  productAttributes: ProductAttribute[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productAttributesSource!: MatTableDataSource<ProductAttribute, MatPaginator>;

  // Dialog Fields
  product!: Product;
  attributeOption!: AttributeOption;

  constructor(
    private productAttributeService: ProductAttributeService,
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
  openDialog(): void {

    const productAttributeData: ProductAttribute = {
      product: this.product,
      attributeOption: this.attributeOption
    };

    const productAttributeDialogRef = this.productAttributeDialog.open(ProductAttributeDialogComponent, {
      data: productAttributeData,
    });

    productAttributeDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productAttributeService.addProductAttribute(productAttributeData).subscribe(response => {
          this.productAttributes.push(productAttributeData);
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
