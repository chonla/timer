import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { SettingsService } from './services/settings.service';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    const mockSettings = ({
      onSettingChanged$: jest.fn().mockReturnValue(of({
        useSound: true,
        darkMode: false,
        selectedSound: '',
        selectedTheme: ''
      }))
    } as unknown) as SettingsService;

    component = new AppComponent(mockSettings);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
