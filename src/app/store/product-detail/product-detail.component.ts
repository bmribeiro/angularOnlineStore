import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductItemService } from '../../services/product-item.service';
import { ProductItem } from '../../models/ProductItem';
import { take } from 'rxjs';
import { ProductVariation } from '../../models/ProductVariation';
import { ProductVariationService } from '../../services/product-variation.service';
import { Colour } from '../../models/Colour';
import { ColourService } from '../../services/colour.service';
import { ProductImage } from '../../models/ProductImage';
import { ProductItemImageService } from '../../services/product-item-image.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  productId: number | null = null;
  productItem: ProductItem[] = [];

  selectedProductItem!: ProductItem;

  productImages: ProductImage[] = [];
  productVariations: ProductVariation[] = [];
  productColours: Colour[] = [];

  constructor(
    private route: ActivatedRoute,
    private productItemService: ProductItemService,
    private productItemImageService: ProductItemImageService,
    private productVariationService: ProductVariationService,
    private colourService : ColourService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.productId = +id;
        this.loadProductDetail();
      }
    });
  }

  async loadProductDetail() {
    if (this.productId !== null) {
      try {

        console.log(this.productId);

        // Product Detail
        const dataItem = await this.productItemService.getProductItemsByProduct(this.productId).pipe(take(1)).toPromise();
        this.productItem = dataItem as ProductItem[];

        // Verifica se há itens do produto
        if (this.productItem && this.productItem.length > 0) {
          this.selectedProductItem = this.productItem[0];
          console.log('ProductItem Selected: ' + JSON.stringify(this.selectedProductItem));
        }
      } catch (error) {
        console.error('Error loading product details:', error);
      }
    }
    this.loadComboOptions();
  }

  async loadComboOptions() {

    if (this.selectedProductItem && this.selectedProductItem.productItemId !== null) {
      try {
        // Imagens
        const dataProductImage = await this.productItemImageService.getProductImagesByProductItem(this.selectedProductItem.productItemId).pipe(take(1)).toPromise();
        this.productImages = dataProductImage as unknown as ProductImage[];

        // Variações
        const dataProductVariation = await this.productVariationService.getProductVariationsByProductItem(this.selectedProductItem.productItemId).pipe(take(1)).toPromise();
        this.productVariations = dataProductVariation as unknown as ProductVariation[];

        // Cores
        const dataColour = await this.productItemService.getColoursByProductId(this.selectedProductItem.productItemId).pipe(take(1)).toPromise();
        this.productColours = dataColour as Colour[];

        console.log(this.productVariations);

      } catch (error) {
        console.error('Error fetching product images or variations:', error);
      }
    }
  }
}
