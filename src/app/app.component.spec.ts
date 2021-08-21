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
      onSettingChange$: jest.fn().mockReturnValue(of({
        useSound: true,
        darkMode: false,
        selectedSound: '',
        selectedTheme: ''
      })),
      load: jest.fn()
    } as unknown) as SettingsService;
    mockTimer = ({
      start: jest.fn(),
      stop: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      setSeconds: jest.fn(),
      onStateChange$: jest.fn().mockReturnValue(of(TimerState.UNINITIALIZED)),
      onTicksChange$: jest.fn().mockReturnValue(of(1))
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

  it('should subscribe to settings change and make a call to load when init', () => {
    component.ngOnInit();

    expect(mockSettings.onSettingChange$).toBeCalledTimes(1);
    expect(mockSettings.load).toBeCalledTimes(1);
  });

  it('should subscribe to timer tick change when init', () => {
    component.ngOnInit();

    expect(mockTimer.onTicksChange$).toBeCalledTimes(1);
  });

  it('should play ending sound when tick is counted down to zero', () => {
    mockTimer.onTicksChange$ = jest.fn().mockReturnValue(of(0));
    mockSettings.onSettingChange$ = jest.fn().mockReturnValue(of({
      useSound: true,
      darkMode: false,
      selectedSound: '',
      selectedTheme: ''
    }));

    component.ngOnInit();

    expect(mockAudio.play).toBeCalledTimes(1);
  });

  it('should play ending sound when tick is counted down to zero', () => {
    mockTimer.onTicksChange$ = jest.fn().mockReturnValue(of(0));
    mockSettings.onSettingChange$ = jest.fn().mockReturnValue(of({
      useSound: false,
      darkMode: false,
      selectedSound: '',
      selectedTheme: ''
    }));

    component.ngOnInit();

    expect(mockAudio.play).toBeCalledTimes(0);
  });

  it('should not play ending sound when tick is not counted down to zero', () => {
    mockTimer.onTicksChange$ = jest.fn().mockReturnValue(of(1));
    mockSettings.onSettingChange$ = jest.fn().mockReturnValue(of({
      useSound: true,
      darkMode: false,
      selectedSound: '',
      selectedTheme: ''
    }));

    component.ngOnInit();

    expect(mockAudio.play).toBeCalledTimes(0);
  });

  it('should play load sound when sound is used', () => {
    mockSettings.onSettingChange$ = jest.fn().mockReturnValue(of({
      useSound: true,
      darkMode: false,
      selectedSound: 'whaaa!',
      selectedTheme: ''
    }));

    component.ngOnInit();

    expect(mockAudio.load).toBeCalledWith('whaaa!');
  });  
});
