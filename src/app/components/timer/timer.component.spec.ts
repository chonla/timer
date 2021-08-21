import { defer, of } from 'rxjs';
import { configurations } from '../../constants/configurations';
import { TimerState } from '../../enums/timer-state.enum';
import { TimerService } from '../../services/timer.service';
import { TimerComponent } from './timer.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalThemeComponent } from '../digital-theme/digital-theme.component';
import { GoogleThemeComponent } from '../google-theme/google-theme.component';
import { DeveloperThemeComponent } from '../developer-theme/developer-theme.component';
import { ReadableStatePipe } from '../../pipes/readable-state.pipe';
import { ToTimePipe } from '../../pipes/to-time.pipe';

describe('TimerComponent', () => {
  let component: TimerComponent;
  // let mockTimer: TimerService;
  let timer: TimerService;

  beforeEach(() => {
    // mockTimer = ({
    //   start: jest.fn(),
    //   stop: jest.fn(),
    //   pause: jest.fn(),
    //   resume: jest.fn(),
    //   setTicks: jest.fn(),
    //   getTicks: jest.fn().mockReturnValue(400),
    //   onStateChange$: jest.fn().mockReturnValue(of(TimerState.UNINITIALIZED)),
    //   onTicksChange$: jest.fn().mockReturnValue(of(6))
    // } as unknown) as TimerService;
    // component = new TimerComponent(mockTimer);
    timer = new TimerService();
    jest.spyOn(timer, 'onTicksChange$');
    jest.spyOn(timer, 'onStateChange$');
    component = new TimerComponent(timer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to timer tick change when init', () => {
    component.ngOnInit();

    expect(timer.onTicksChange$).toBeCalledTimes(1);
    // expect(mockTimer.onTicksChange$).toBeCalledTimes(1);
  });

  it('should subscribe to timer state change when init', () => {
    component.ngOnInit();

    expect(timer.onStateChange$).toBeCalledTimes(1);
    // expect(mockTimer.onStateChange$).toBeCalledTimes(1);
  });

  it('should set ticks when tick changes', () => {
    component.ngOnInit();

    timer.setSeconds(6);

    expect(component.ticks).toEqual(6 * configurations.ticksPerSecond);
    expect(component.totalTicks).toEqual(6 * configurations.ticksPerSecond);
  });

  describe('Time is almost running out', () => {    
    it('should set user attention flag to true if ticks left is equal to attentionRequiredAt constant', () => {
      // timer.onTicksChange$ = jest.fn().mockReturnValue(of(configurations.attentionRequiredAt))
  
      component.ngOnInit();

      timer.setSeconds(configurations.attentionRequiredAt);
  
      expect(component.attentionRequired).toEqual(true);
    });
  
  
    it('should set user attention flag to true if ticks left is less than attentionRequiredAt constant', () => {
      // mockTimer.onTicksChange$ = jest.fn().mockReturnValue(of(configurations.attentionRequiredAt - 1));
  
      component.ngOnInit();

      timer.setSeconds(configurations.attentionRequiredAt - 1);
  
      expect(component.attentionRequired).toEqual(true);
    });
  
    it('should set user attention flag to false if ticks left is greater than attentionRequiredAt constant', () => {
      // mockTimer.onTicksChange$ = jest.fn().mockReturnValue(of(configurations.attentionRequiredAt + 1));
  
      component.ngOnInit();

      timer.setSeconds(configurations.attentionRequiredAt + 1);
  
      expect(component.attentionRequired).toEqual(false);
    });
  });

  describe('Timer state is changed', () => {
    it('should update component state when timer state changes', () => {
      // mockTimer.onStateChange$ = jest.fn().mockReturnValue(of(TimerState.PAUSED));

      component.ngOnInit();

      timer.setSeconds(6);
      timer.start();
      timer.pause();

      expect(component.state).toEqual(TimerState.PAUSED);
    });
  });
});
