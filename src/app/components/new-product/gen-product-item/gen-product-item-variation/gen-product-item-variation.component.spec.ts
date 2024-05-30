import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenProductItemVariationComponent } from './gen-product-item-variation.component';

describe('GenProductItemVariationComponent', () => {
  let component: GenProductItemVariationComponent;
  let fixture: ComponentFixture<GenProductItemVariationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenProductItemVariationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenProductItemVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
