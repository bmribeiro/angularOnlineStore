import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemDialogComponent } from './product-item-dialog.component';

describe('ProductItemDialogComponent', () => {
  let component: ProductItemDialogComponent;
  let fixture: ComponentFixture<ProductItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
