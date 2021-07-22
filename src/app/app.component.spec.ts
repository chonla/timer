import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { TimerState } from './enums/timer-state.enum';
import { AudioService } from './services/audio.service';
import { SettingsService } from './services/settings.service';
import { TimerService } from './services/timer.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockSettings: SettingsService;
  let mockTimer: TimerService;
  let mockAudio: AudioService;

  beforeEach(() => {
    mockSettings = ({
      onSettingChanged$: jest.fn().mockReturnValue(of({
        useSound: true,
        darkMode: false,
        selectedSound: '',
        selectedTheme: ''
      }))
    } as unknown) as SettingsService;
    mockTimer = ({
      start: jest.fn(),
      stop: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      setTicks: jest.fn(),
      onStateChange$: jest.fn().mockReturnValue(of(TimerState.UNINITIALIZED)),
    } as unknown) as TimerService;
    mockAudio = ({
      load: jest.fn(),
      play: jest.fn(),
    } as unknown) as AudioService;

    component = new AppComponent(mockSettings, mockTimer, mockAudio);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
