import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowroomComponent } from './showroom.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: ShowroomComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'products/:id', component: ProductsComponent },
  { path: 'productDetail/:id', component: ProductDetailComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowroomRoutingModule { }
