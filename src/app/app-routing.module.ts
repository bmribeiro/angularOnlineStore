import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/storeConfig/brand/brand.component';
import { SizeCategoryComponent } from './components/storeConfig/size-category/size-category.component';
import { ColourComponent } from './components/storeConfig/colour/colour.component';
import { ProductCategoryComponent } from './components/storeConfig/product-category/product-category.component';
import { ProductComponent } from './components/storeConfig/product/product.component';
import { ProductItemComponent } from './components/storeConfig/product-item/product-item.component';
import { ProductImageComponent } from './components/storeConfig/product-image/product-image.component';
import { ProductVariationComponent } from './components/storeConfig/product-variation/product-variation.component';
import { AttributeOptionComponent } from './attribute-option/attribute-option.component';
import { AttributeTypeComponent } from './attribute-type/attribute-type.component';
import { SizeOptionComponent } from './components/storeConfig/size-option/size-option.component';
import { ProductAttributeComponent } from './components/storeConfig/product-attribute/product-attribute.component';

const routes: Routes = [
  { path: '', redirectTo: '/brands', pathMatch: 'full' },
  { path: 'brands', component: BrandComponent },
  { path: 'sizeCategories', component: SizeCategoryComponent },
  { path: 'colours', component: ColourComponent },
  { path: 'productCategories', component: ProductCategoryComponent },
  { path: 'products', component: ProductComponent },
  { path: 'productItems', component: ProductItemComponent },
  { path: 'productImage', component: ProductImageComponent },
  { path: 'productVariation', component: ProductVariationComponent },
  { path: 'sizeOptions', component: SizeOptionComponent },
  { path: 'productAttribute', component: ProductAttributeComponent },
  { path: 'attributeOption', component: AttributeOptionComponent },
  { path: 'attributeType', component: AttributeTypeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
