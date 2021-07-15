import { of } from 'rxjs';
import { TimerState } from '../../enums/timer-state.enum';
import { TimerService } from '../../services/timer.service';
import { ControllerComponent } from './controller.component';

describe('ControllerComponent', () => {
  let component: ControllerComponent;
  let timer: TimerService;

  beforeEach(() => {
    timer = ({
      start: jest.fn(),
      stop: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      setTicks: jest.fn(),
      onStateChange$: jest.fn().mockReturnValue(of(TimerState.UNINITIALIZED)),
    } as unknown) as TimerService;
    component = new ControllerComponent(timer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Settings', () => {
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
    });

    describe('Theme Settings', () => {
      it('should emit selected theme when theme changes', (done) => {
        const target = ({
          value: 'test-theme'
        } as unknown) as HTMLSelectElement;
        const event = ({
          target: target
        } as unknown) as Event;
    
        component.onThemeChanged.subscribe(theme => {
          expect(theme).toEqual('test-theme');
          done();
        });

        component.themeChanged(event);
      });
    });
  });

  describe('Controller', () => {
    describe('Calling Service', () => {
      it('should call timer start', () => {
        component.start();
        
        expect(timer.start).toBeCalledTimes(1);
      });

      it('should call timer stop', () => {
        component.stop();
        
        expect(timer.stop).toBeCalledTimes(1);
      });

      it('should call timer pause', () => {
        component.pause();
        
        expect(timer.pause).toBeCalledTimes(1);
      });

      it('should call timer resume', () => {
        component.resume();
        
        expect(timer.resume).toBeCalledTimes(1);
      });

      it('should call timer setTicks', () => {
        component.setTime(300);

        expect(timer.setTicks).toBeCalledWith(300);
        expect(timer.setTicks).toBeCalledTimes(1);
      })
    });

    describe('State', () => {
      it('should return true when timer is idle', () => {
        component.state = TimerState.IDLE;

        expect(component.isIdle()).toBe(true);
      });

      it('should return false when timer is not idle', () => {
        component.state = TimerState.RUNNING;

        expect(component.isIdle()).toBe(false);
      });

      it('should return true when timer is uninitialized', () => {
        component.state = TimerState.UNINITIALIZED;

        expect(component.isUninitialized()).toBe(true);
      });

      it('should return false when timer is not uninitialized', () => {
        component.state = TimerState.RUNNING;

        expect(component.isUninitialized()).toBe(false);
      });

      it('should return true when timer is paused', () => {
        component.state = TimerState.PAUSED;

        expect(component.isPaused()).toBe(true);
      });

      it('should return false when timer is not paused', () => {
        component.state = TimerState.RUNNING;

        expect(component.isPaused()).toBe(false);
      });

      it('should return true when timer is running', () => {
        component.state = TimerState.RUNNING;

        expect(component.isRunning()).toBe(true);
      });

      it('should return false when timer is not running', () => {
        component.state = TimerState.IDLE;

        expect(component.isRunning()).toBe(false);
      });
    });

    describe('UI', () => {
      it('should display play button if timer is ready to start', () => {
        component.state = TimerState.IDLE;

        expect(component.shouldShowPlayButton()).toBe(true);
      });

      it('should not display play button if timer is not ready to start', () => {
        component.state = TimerState.UNINITIALIZED;

        expect(component.shouldShowPlayButton()).toBe(false);
      });

      it('should not display play button if timer is running', () => {
        component.state = TimerState.RUNNING;

        expect(component.shouldShowPlayButton()).toBe(false);
      });

      it('should display resume button if timer is running', () => {
        component.state = TimerState.RUNNING;

        expect(component.shouldShowResumeButton()).toBe(true);
      });

      it('should display resume button if timer is paused', () => {
        component.state = TimerState.PAUSED;

        expect(component.shouldShowResumeButton()).toBe(true);
      });

      it('should not display resume button if timer is uninitialized', () => {
        component.state = TimerState.UNINITIALIZED;

        expect(component.shouldShowResumeButton()).toBe(false);
      });

      it('should not display resume button if timer is stopped', () => {
        component.state = TimerState.IDLE;

        expect(component.shouldShowResumeButton()).toBe(false);
      });

      it('should disable pause button if timer is paused', () => {
        component.state = TimerState.PAUSED;

        expect(component.shouldDisablePauseButton()).toBe(true);
      });

      it('should disable pause button if timer is uninitialized', () => {
        component.state = TimerState.UNINITIALIZED;

        expect(component.shouldDisablePauseButton()).toBe(true);
      });

      it('should disable pause button if timer is stopped', () => {
        component.state = TimerState.IDLE;

        expect(component.shouldDisablePauseButton()).toBe(true);
      });

      it('should not disable pause button if timer is running', () => {
        component.state = TimerState.RUNNING;

        expect(component.shouldDisablePauseButton()).toBe(false);
      });

      it('should disable stop button if timer is stopped', () => {
        component.state = TimerState.IDLE;

        expect(component.shouldDisableStopButton()).toBe(true);
      });

      it('should disable stop button if timer is uninitialized', () => {
        component.state = TimerState.UNINITIALIZED;

        expect(component.shouldDisableStopButton()).toBe(true);
      });

      it('should not disable stop button if timer is paused', () => {
        component.state = TimerState.PAUSED;

        expect(component.shouldDisableStopButton()).toBe(false);
      });

      it('should not disable pause button if timer is running', () => {
        component.state = TimerState.RUNNING;

        expect(component.shouldDisableStopButton()).toBe(false);
      });

      it('should disable time setting button if timer is running', () => {
        component.state = TimerState.RUNNING;

        expect(component.shouldDisableTimeSetButton()).toBe(true);
      });

      it('should disable time setting button if timer is paused', () => {
        component.state = TimerState.PAUSED;

        expect(component.shouldDisableTimeSetButton()).toBe(true);
      });

      it('should not disable time setting button if timer is uninitialized', () => {
        component.state = TimerState.UNINITIALIZED;

        expect(component.shouldDisableTimeSetButton()).toBe(false);
      });

      it('should not disable time setting button if timer is stopped', () => {
        component.state = TimerState.IDLE;

        expect(component.shouldDisableTimeSetButton()).toBe(false);
      });
    });
  });

});
