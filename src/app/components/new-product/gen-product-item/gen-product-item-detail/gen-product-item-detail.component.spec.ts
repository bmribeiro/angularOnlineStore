import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenProductItemDetailComponent } from './gen-product-item-detail.component';

describe('GenProductItemDetailComponent', () => {
  let component: GenProductItemDetailComponent;
  let fixture: ComponentFixture<GenProductItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenProductItemDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenProductItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
