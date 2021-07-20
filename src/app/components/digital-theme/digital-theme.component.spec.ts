import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalThemeComponent } from './digital-theme.component';

describe('DigitalThemeComponent', () => {
  let component: DigitalThemeComponent;
  let fixture: ComponentFixture<DigitalThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
