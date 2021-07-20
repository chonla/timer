import { AppComponent } from './app.component';
import { ColorSchemeService } from './services/color-scheme.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockColor: ColorSchemeService;

  beforeEach(() => {
    mockColor = ({
      setColorScheme: jest.fn(),
      onColorSchemeChanged$: jest.fn()
    } as unknown) as ColorSchemeService;

    component = new AppComponent(mockColor);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
