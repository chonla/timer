import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTimeModalComponent } from './custom-time-modal.component';

describe('CustomTimeModalComponent', () => {
  let component: CustomTimeModalComponent;
  let fixture: ComponentFixture<CustomTimeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTimeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
