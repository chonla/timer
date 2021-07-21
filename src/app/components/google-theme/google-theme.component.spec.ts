import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleThemeComponent } from './google-theme.component';

describe('GoogleThemeComponent', () => {
  let component: GoogleThemeComponent;
  let fixture: ComponentFixture<GoogleThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
