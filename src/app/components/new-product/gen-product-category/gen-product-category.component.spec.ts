import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenProductCategoryComponent } from './gen-product-category.component';

describe('GenProductCategoryComponent', () => {
  let component: GenProductCategoryComponent;
  let fixture: ComponentFixture<GenProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenProductCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
