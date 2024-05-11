import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeOptionComponent } from './attribute-option.component';

describe('AttributeOptionComponent', () => {
  let component: AttributeOptionComponent;
  let fixture: ComponentFixture<AttributeOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
