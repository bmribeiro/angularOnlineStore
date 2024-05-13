import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeOptionDialogComponent } from './attribute-option-dialog.component';

describe('AttributeOptionDialogComponent', () => {
  let component: AttributeOptionDialogComponent;
  let fixture: ComponentFixture<AttributeOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeOptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
