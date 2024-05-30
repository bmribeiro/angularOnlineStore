import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenImageDialogComponent } from './gen-image-dialog.component';

describe('GenImageDialogComponent', () => {
  let component: GenImageDialogComponent;
  let fixture: ComponentFixture<GenImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenImageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
