import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenVariationDialogComponent } from './gen-variation-dialog.component';

describe('GenVariationDialogComponent', () => {
  let component: GenVariationDialogComponent;
  let fixture: ComponentFixture<GenVariationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenVariationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenVariationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
