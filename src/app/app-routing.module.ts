import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/storeConfig/brand/brand.component';
import { SizeCategoryComponent } from './components/storeConfig/sizeCategory/size-category.component';
import { ColourComponent } from './components/storeConfig/colour/colour.component';

const routes: Routes = [
  { path: '', redirectTo: '/brands', pathMatch: 'full' },
  { path: 'brands', component: BrandComponent },
  { path: 'sizeCategories', component: SizeCategoryComponent },
  { path: 'colours', component: ColourComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
