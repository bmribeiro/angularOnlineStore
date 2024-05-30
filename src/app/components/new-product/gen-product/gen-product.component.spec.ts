import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenProductComponent } from './gen-product.component';

describe('GenProductComponent', () => {
  let component: GenProductComponent;
  let fixture: ComponentFixture<GenProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
