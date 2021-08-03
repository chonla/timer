import { of } from 'rxjs';
import { TimerState } from '../../enums/timer-state.enum';
import { SettingsService } from '../../services/settings.service';
import { TimerService } from '../../services/timer.service';
import { SettingComponent } from './setting.component';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let mockTimer: TimerService;
  let mockSettings: SettingsService;

  beforeEach(() => {
    mockTimer = ({
      start: jest.fn(),
      stop: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      setTicks: jest.fn(),
      onStateChange$: jest.fn().mockReturnValue(of(TimerState.UNINITIALIZED)),
      isRunning: jest.fn(),
      isPaused: jest.fn(),
    } as unknown) as TimerService;
    mockSettings = ({
      load: jest.fn(),
      update: jest.fn(),
      onSettingChange$: jest.fn().mockReturnValue(of({
        useSound: true,
        darkMode: false,
        selectedSound: '',
        selectedTheme: ''
      }))
    } as unknown) as SettingsService;
    component = new SettingComponent(mockTimer, mockSettings);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Subscription', () => {
    it('should update setting when setting changes', () => {
      mockSettings.onSettingChange$ = jest.fn().mockReturnValue(of({
        useSound: false,
        darkMode: true,
        selectedSound: 'test1',
        selectedTheme: 'test2',
      }));

      component.ngOnInit();

      expect(component.darkMode).toEqual(true);
      expect(component.useSound).toEqual(false);
      expect(component.selectedSound).toEqual('test1');
      expect(component.selectedTheme).toEqual('test2');
    });
  });

  describe('Settings', () => {
    it('should load settings when component init', () => {
      component.ngOnInit();

      expect(mockSettings.load).toBeCalledTimes(1);
    });

    describe('Sound Settings', () => {
      it('should turn off sound when toggle sound with false', () => {
        component.soundToggled(false);

        expect(component.useSound).toBe(false);
      });

      it('should turn on sound when toggle sound with true', () => {
        component.soundToggled(true);

        expect(component.useSound).toBe(true);
      });

      it('should turn on sound by default', () => {
        expect(component.useSound).toBe(true);
      });

      it('should emit selected sound when sound changes', () => {
        const target = ({
          value: 'test-sound'
        } as unknown) as HTMLSelectElement;
        const event = ({
          target: target
        } as unknown) as Event;

        component.soundChange(event);

        expect(mockSettings.update).toBeCalledWith('selectedSound', 'test-sound');
      });
    });

    describe('Theme Settings', () => {
      it('should emit selected theme when theme changes', (done) => {
        const target = ({
          value: 'test-theme'
        } as unknown) as HTMLSelectElement;
        const event = ({
          target: target
        } as unknown) as Event;

        component.onThemeChange.subscribe(theme => {
          expect(theme).toEqual('test-theme');
          done();
        });

        component.themeChange(event);

        expect(mockSettings.update).toBeCalledWith('selectedTheme', 'test-theme');
      });
    });

    describe('Color Scheme Settings', () => {
      it('should change color scheme to dark mode when dark mode is selected', () => {
        component.darkModeToggled(true);

        expect(mockSettings.update).toBeCalledWith('darkMode', true);
      });

      it('should change color scheme to dark mode when dark mode is deselected', () => {
        component.darkModeToggled(false);

        expect(mockSettings.update).toBeCalledWith('darkMode', false);
      });
    });

    describe('Settings Panel', () => {
      it('should open setting panel', () => {
        component.settingClosed = true;

        component.openSettings();

        expect(component.settingClosed).toBe(false);
      });

      it('should close setting panel', () => {
        component.settingClosed = false;

        component.closeSettings();

        expect(component.settingClosed).toBe(true);
      });
    });
  });

  describe('Time Setting', () => {
    it('should call timer setTicks', () => {
      component.setTime(300);

      expect(mockTimer.setTicks).toBeCalledWith(300);
      expect(mockTimer.setTicks).toBeCalledTimes(1);
    });

    it('should disable time setting button if timer is running', () => {
      jest.spyOn(mockTimer, 'isRunning').mockReturnValue(true);
      jest.spyOn(mockTimer, 'isPaused').mockReturnValue(false);

      expect(component.shouldDisableTimeSetButton()).toBe(true);
    });

    it('should disable time setting button if timer is paused', () => {
      jest.spyOn(mockTimer, 'isRunning').mockReturnValue(false);
      jest.spyOn(mockTimer, 'isPaused').mockReturnValue(true);

      expect(component.shouldDisableTimeSetButton()).toBe(true);
    });

    it('should not disable time setting button if timer is not running nor paused', () => {
      jest.spyOn(mockTimer, 'isRunning').mockReturnValue(false);
      jest.spyOn(mockTimer, 'isPaused').mockReturnValue(false);

      expect(component.shouldDisableTimeSetButton()).toBe(false);
    });
  });

  describe('Custom Timer', () => {
    it('should open custom timer modal', () => {
      component.customModalClosed = true;

      component.openCustomModal();

      expect(component.customModalClosed).toEqual(false);
    });

    it('should close custom timer modal', () => {
      component.customModalClosed = false;

      component.closeCustomModal();

      expect(component.customModalClosed).toEqual(true);
    });

    it('should reset custom timer modal close flag when modal closed from modal itself', () => {
      component.customModalClosed = false;

      component.onTimerModalClosed();

      expect(component.customModalClosed).toEqual(true);
    });

    it('should add new custom timer into setting', () => {
      component.customTimers = [];

      component.onCreateCustomTime(20);

      expect(component.customTimers).toEqual([20]);
      expect(mockSettings.update).toBeCalledWith('customTimers', [20]);
    });

    it('should remove a custom timer from setting', () => {
      component.customTimers = [10, 20, 30];

      component.deleteTime(1);

      expect(component.customTimers).toEqual([10, 30]);
      expect(mockSettings.update).toBeCalledWith('customTimers', [10, 30]);
    });
  });
});
