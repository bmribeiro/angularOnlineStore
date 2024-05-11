import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariationDialogComponent } from './product-variation-dialog.component';

describe('ProductVariationDialogComponent', () => {
  let component: ProductVariationDialogComponent;
  let fixture: ComponentFixture<ProductVariationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductVariationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductVariationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
