import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributComponent } from './product-attribute.component';

describe('ProductAttributComponent', () => {
  let component: ProductAttributComponent;
  let fixture: ComponentFixture<ProductAttributComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAttributComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAttributComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
