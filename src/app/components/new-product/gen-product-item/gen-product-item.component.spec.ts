import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenProductItemComponent } from './gen-product-item.component';

describe('GenProductItemComponent', () => {
  let component: GenProductItemComponent;
  let fixture: ComponentFixture<GenProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenProductItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
