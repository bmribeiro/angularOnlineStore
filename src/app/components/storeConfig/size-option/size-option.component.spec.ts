import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeOptionComponent } from './size-option.component';

describe('SizeOptionComponent', () => {
  let component: SizeOptionComponent;
  let fixture: ComponentFixture<SizeOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SizeOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SizeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
