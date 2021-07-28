import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableDigitComponent } from './scrollable-digit.component';

describe('ScrollableDigitComponent', () => {
  let component: ScrollableDigitComponent;
  let fixture: ComponentFixture<ScrollableDigitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollableDigitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollableDigitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
