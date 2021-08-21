import { of } from 'rxjs';
import { SettingsService } from '../../services/settings.service';
import { TimerState } from '../../enums/timer-state.enum';
import { TimerService } from '../../services/timer.service';
import { ControllerComponent } from './controller.component';

describe('ControllerComponent', () => {
  let component: ControllerComponent;
  let mockTimer: TimerService;

  beforeEach(() => {
    mockTimer = ({
      start: jest.fn(),
      stop: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      setSeconds: jest.fn(),
      onStateChange$: jest.fn().mockReturnValue(of(TimerState.UNINITIALIZED)),
      isRunning: jest.fn(),
      isPaused: jest.fn(),
      isUninitialized: jest.fn(),
      isIdle: jest.fn(),
    } as unknown) as TimerService;
    component = new ControllerComponent(mockTimer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Controller', () => {
    describe('Calling Service', () => {
      it('should call timer start', () => {
        component.start();

        expect(mockTimer.start).toBeCalledTimes(1);
      });

      it('should call timer stop', () => {
        component.stop();

        expect(mockTimer.stop).toBeCalledTimes(1);
      });

      it('should call timer pause', () => {
        component.pause();

        expect(mockTimer.pause).toBeCalledTimes(1);
      });

      it('should call timer resume', () => {
        component.resume();

        expect(mockTimer.resume).toBeCalledTimes(1);
      });
    });

    describe('UI', () => {
      it('should display play button if timer is ready to start', () => {
        jest.spyOn(mockTimer, 'isIdle').mockReturnValue(true);
        jest.spyOn(mockTimer, 'isUninitialized').mockReturnValue(false);

        expect(component.shouldShowPlayButton()).toBe(true);
      });

      it('should display play button if timer is not ready to start', () => {
        jest.spyOn(mockTimer, 'isIdle').mockReturnValue(false);
        jest.spyOn(mockTimer, 'isUninitialized').mockReturnValue(true);

        expect(component.shouldShowPlayButton()).toBe(true);
      });

      it('should not display play button if timer is other state than idle or uninitialized', () => {
        jest.spyOn(mockTimer, 'isIdle').mockReturnValue(false);
        jest.spyOn(mockTimer, 'isUninitialized').mockReturnValue(false);

        expect(component.shouldShowPlayButton()).toBe(false);
      });

      it('should display resume button if timer is running', () => {
        jest.spyOn(mockTimer, 'isRunning').mockReturnValue(true);
        jest.spyOn(mockTimer, 'isPaused').mockReturnValue(false);

        expect(component.shouldShowResumeButton()).toBe(true);
      });

      it('should display resume button if timer is paused', () => {
        jest.spyOn(mockTimer, 'isRunning').mockReturnValue(false);
        jest.spyOn(mockTimer, 'isPaused').mockReturnValue(true);

        expect(component.shouldShowResumeButton()).toBe(true);
      });

      it('should not display resume button if timer is in other state than running or paused', () => {
        jest.spyOn(mockTimer, 'isRunning').mockReturnValue(false);
        jest.spyOn(mockTimer, 'isPaused').mockReturnValue(false);

        expect(component.shouldShowResumeButton()).toBe(false);
      });

      it('should disable pause button if timer is paused', () => {
        jest.spyOn(mockTimer, 'isUninitialized').mockReturnValue(false);
        jest.spyOn(mockTimer, 'isPaused').mockReturnValue(true);

        expect(component.shouldDisablePauseButton()).toBe(true);
      });

      it('should disable pause button if timer is uninitialized', () => {
        jest.spyOn(mockTimer, 'isUninitialized').mockReturnValue(true);
        jest.spyOn(mockTimer, 'isRunning').mockReturnValue(false);

        expect(component.shouldDisablePauseButton()).toBe(true);
      });

      it('should disable pause button if timer is not running', () => {
        jest.spyOn(mockTimer, 'isUninitialized').mockReturnValue(false);
        jest.spyOn(mockTimer, 'isRunning').mockReturnValue(false);

        expect(component.shouldDisablePauseButton()).toBe(true);
      });

      it('should not disable pause button if timer is running', () => {
        jest.spyOn(mockTimer, 'isUninitialized').mockReturnValue(false);
        jest.spyOn(mockTimer, 'isRunning').mockReturnValue(true);

        expect(component.shouldDisablePauseButton()).toBe(false);
      });

      it('should disable stop button if timer is stopped', () => {
        jest.spyOn(mockTimer, 'isIdle').mockReturnValue(true);
        jest.spyOn(mockTimer, 'isUninitialized').mockReturnValue(false);

        expect(component.shouldDisableStopButton()).toBe(true);
      });

      it('should disable stop button if timer is uninitialized', () => {
        jest.spyOn(mockTimer, 'isIdle').mockReturnValue(false);
        jest.spyOn(mockTimer, 'isUninitialized').mockReturnValue(true);

        expect(component.shouldDisableStopButton()).toBe(true);
      });

      it('should not disable stop button if timer is in other state than paused or uninitialized', () => {
        jest.spyOn(mockTimer, 'isIdle').mockReturnValue(false);
        jest.spyOn(mockTimer, 'isUninitialized').mockReturnValue(false);

        expect(component.shouldDisableStopButton()).toBe(false);
      });
    });
  });
});
