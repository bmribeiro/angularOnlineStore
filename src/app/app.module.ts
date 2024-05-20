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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BrandComponent } from './components/storeConfig/brand/brand.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SizeCategoryComponent } from './components/storeConfig/size-category/size-category.component';
import { MatMenuModule } from '@angular/material/menu';
import { MenuBarComponent } from './header/menu-bar.component';
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
import { AttributeOptionComponent } from './components/storeConfig/attribute-option/attribute-option.component';
import { AttributeTypeComponent } from './components/storeConfig/attribute-type/attribute-type.component';
import { AttributeTypeDialogComponent } from './components/dialogs/attribute-type-dialog/attribute-type-dialog.component';
import { AttributeOptionDialogComponent } from './components/dialogs/attribute-option-dialog/attribute-option-dialog.component';
import { ProductAttributeDialogComponent } from './components/dialogs/product-attribute-dialog/product-attribute-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductDialogComponent } from './components/dialogs/product-dialog/product-dialog.component';
import { ProductItemDialogComponent } from './components/dialogs/product-item-dialog/product-item-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './components/storeCart/cart/cart.component';
import { CartBillingComponent } from './components/storeCart/cart-billing/cart-billing.component';
import { CartDeliveryComponent } from './components/storeCart/cart-delivery/cart-delivery.component';
import { CartPaymentComponent } from './components/storeCart/cart-payment/cart-payment.component';
import { CartShippingComponent } from './components/storeCart/cart-shipping/cart-shipping.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductVariationDialogComponent } from './components/dialogs/product-variation-dialog/product-variation-dialog.component';
import { SizeOptionDialogComponent } from './components/dialogs/size-option-dialog/size-option-dialog.component';
import { FooterComponent } from './footer/footer.component';

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
        ProductDialogComponent,
        ProductItemComponent,
        ProductItemDialogComponent,
        ProductImageComponent,
        ProductVariationComponent,
        ProductVariationDialogComponent,
        SizeOptionComponent,
        SizeOptionDialogComponent,
        ProductAttributeComponent,
        ProductAttributeDialogComponent,
        AttributeOptionComponent,
        AttributeOptionDialogComponent,
        AttributeTypeComponent,
        AttributeTypeDialogComponent,
        CartComponent,
        CartBillingComponent,
        CartDeliveryComponent,
        CartPaymentComponent,
        CartShippingComponent,
        FooterComponent
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
        ReactiveFormsModule,
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
        MatMenuModule,
        MatSelectModule,
        MatIconModule,
        NoopAnimationsModule
    ],
})
export class AppModule { }
