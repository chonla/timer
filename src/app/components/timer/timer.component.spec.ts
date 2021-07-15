import { of } from 'rxjs';
import { TimerState } from '../../enums/timer-state.enum';
import { TimerService } from '../../services/timer.service';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
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
    component = new TimerComponent(timer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
