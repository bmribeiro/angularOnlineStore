import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeDialogComponent } from './product-attribute-dialog.component';

describe('ProductAttributeDialogComponent', () => {
  let component: ProductAttributeDialogComponent;
  let fixture: ComponentFixture<ProductAttributeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAttributeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAttributeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
