import { TimerState } from '../enums/timer-state.enum';
import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    service = new TimerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Ticks', () => {
    it('should set default ticks to 0 when initialized', () => {
      expect(service.getTicks()).toEqual(0);
    });
  
    it('should set ticks', () => {
      service.setTicks(300);
      expect(service.getTicks()).toEqual(300);
    });
  
    it('should trigger ticks change when set ticks', (done) => {
      service.onTicksChanged$().subscribe(ticks => {
        expect(ticks).toEqual(300);
        done();
      });
      service.setTicks(300);
    });
  });

  describe('State', () => {
    it('should set timer state to UNINITIALIZED when initialized', () => {
      expect(service.getState()).toEqual(TimerState.UNINITIALIZED);
    });

    it('should keep uninitialized if start without setting time', () => {
      service.start();
      expect(service.getState()).toEqual(TimerState.UNINITIALIZED);
    });

    it('should keep uninitialized if stop without setting time', () => {
      service.stop();
      expect(service.getState()).toEqual(TimerState.UNINITIALIZED);
    });

    it('should keep uninitialized if pause without setting time', () => {
      service.pause();
      expect(service.getState()).toEqual(TimerState.UNINITIALIZED);
    });

    it('should keep uninitialized if resume without setting time', () => {
      service.resume();
      expect(service.getState()).toEqual(TimerState.UNINITIALIZED);
    });

    it('should set state to running when start timer', () => {
      service.setTicks(1);
      service.start();
      expect(service.getState()).toEqual(TimerState.RUNNING);
    });
  
    it('should trigger state change when set state', (done) => {
      service.onStateChange$().subscribe(state => {
        expect(state).toEqual(TimerState.IDLE);
        done();
      });
      service.setTicks(1);
    });

    it('should set state to idle when stop timer', () => {
      service.setTicks(1);
      service.start();
      service.stop();
      expect(service.getState()).toEqual(TimerState.IDLE);
    });

    it('should set state to paused when pause timer in running state', () => {
      service.setTicks(1);
      service.start();
      service.pause();
      expect(service.getState()).toEqual(TimerState.PAUSED);
    });

    it('should keep state to paused when start timer in paused state', () => {
      service.setTicks(1);
      service.start();
      service.pause();
      service.start();
      expect(service.getState()).toEqual(TimerState.PAUSED);
    });

    it('should keep state to idle when pause timer in idle state', () => {
      service.setTicks(1);
      service.pause();
      expect(service.getState()).toEqual(TimerState.IDLE);
    });

    it('should keep state to idle when pause timer in paused state', () => {
      service.setTicks(1);
      service.start();
      service.pause();
      service.pause();
      expect(service.getState()).toEqual(TimerState.PAUSED);
    });

    it('should continue running when resume from paused state', () => {
      service.setTicks(1);
      service.start();
      service.pause();
      service.resume();
      expect(service.getState()).toEqual(TimerState.RUNNING);
    });

    it('should keep state to idle when resume from idle state', () => {
      service.setTicks(1);
      service.resume();
      expect(service.getState()).toEqual(TimerState.IDLE);
    });

    it('should keep state to running when resume from running state', () => {
      service.setTicks(1);
      service.start();
      service.resume();
      expect(service.getState()).toEqual(TimerState.RUNNING);
    });
  });

  describe('Action', () => {
    afterEach(() => {
      jest.useRealTimers();
    });
    
    it('should trigger timer changes 3 times when set ticks to 3 and start timer and after 3 ticks timer should stop', (done) => {
      const tickCounter = jest.fn();

      jest.useFakeTimers();

      service.onTicksChanged$().subscribe((ticks) => {
        tickCounter();
        if (ticks === 0) {
          done();
        }
      });

      service.setTicks(3);
      service.start();

      jest.advanceTimersByTime(3500);
      expect(tickCounter).toHaveBeenCalledTimes(5); // 3 for ticking, 1 for initializing on start, 1 for constructor
    });
  });
});
