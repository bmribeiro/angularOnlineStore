import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandService } from './services/brand.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CorsInterceptor } from './interceptors/cors.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrandDialogComponent } from './components/dialogs/brand-dialog/brand-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BrandComponent } from './components/storeConfig/brand/brand.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SizeCategoryComponent } from './components/storeConfig/size-category/size-category.component';
import { MatMenuModule } from '@angular/material/menu';
import { MenuBarComponent } from './components/header/menu-bar.component';
import { SizeCategoryDialogComponent } from './components/dialogs/size-category-dialog/size-category-dialog.component';
import { ColourComponent } from './components/storeConfig/colour/colour.component';
import { ColourDialogComponent } from './components/dialogs/colour-dialog/colour-dialog.component';
import { ProductCategoryComponent } from './components/storeConfig/product-category/product-category.component';
import { ProductCategoryDialogComponent } from './components/dialogs/product-category-dialog/product-category-dialog.component';
import { ProductComponent } from './components/storeConfig/product/product.component';
import { ProductItemComponent } from './components/storeConfig/product-item/product-item.component';
import { ProductImageComponent } from './components/storeConfig/product-image/product-image.component';
import { ProductVariationComponent } from './components/storeConfig/product-variation/product-variation.component';
import { SizeOptionComponent } from './components/storeConfig/size-option/size-option.component';
import { ProductAttributeComponent } from './components/storeConfig/product-attribute/product-attribute.component';
import { AttributeOptionComponent } from './attribute-option/attribute-option.component';
import { AttributeTypeComponent } from './attribute-type/attribute-type.component';

@NgModule({
    declarations: [
        AppComponent,
        BrandComponent,
        BrandDialogComponent,
        SizeCategoryComponent,
        MenuBarComponent,
        SizeCategoryDialogComponent,
        ColourComponent,
        ColourDialogComponent,
        ProductCategoryComponent,
        ProductCategoryDialogComponent,
        ProductComponent,
        ProductItemComponent,
        ProductImageComponent,
        ProductVariationComponent,
        SizeOptionComponent,
        ProductAttributeComponent,
        AttributeOptionComponent,
        AttributeTypeComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true },
        BrandService,
        BrandDialogComponent,
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule
    ],
})
export class AppModule { }
