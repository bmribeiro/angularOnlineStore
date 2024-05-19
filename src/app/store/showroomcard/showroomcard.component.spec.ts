import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowroomcardComponent } from './showroomcard.component';

describe('ShowroomcardComponent', () => {
  let component: ShowroomcardComponent;
  let fixture: ComponentFixture<ShowroomcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowroomcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowroomcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
