import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeOptionDialogComponent } from './size-option-dialog.component';

describe('SizeOptionDialogComponent', () => {
  let component: SizeOptionDialogComponent;
  let fixture: ComponentFixture<SizeOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SizeOptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SizeOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
