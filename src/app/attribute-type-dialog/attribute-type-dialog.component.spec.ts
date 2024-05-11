import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeTypeDialogComponent } from './attribute-type-dialog.component';

describe('AttributeTypeDialogComponent', () => {
  let component: AttributeTypeDialogComponent;
  let fixture: ComponentFixture<AttributeTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeTypeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
