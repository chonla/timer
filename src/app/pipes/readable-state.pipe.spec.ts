import { HumanReadableStates } from '../constants/states';
import { TimerState } from '../enums/timer-state.enum';
import { ReadableStatePipe } from './readable-state.pipe';

describe('ReadableStatePipe', () => {
  let pipe: ReadableStatePipe;

  beforeEach(() => {
    pipe = new ReadableStatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Readable Status', () => {
    it('should render uninitialized', () => {
      const result = pipe.transform(TimerState.UNINITIALIZED);
      expect(result).toEqual(HumanReadableStates[TimerState.UNINITIALIZED]);
    });

    it('should render running', () => {
      const result = pipe.transform(TimerState.RUNNING);
      expect(result).toEqual(HumanReadableStates[TimerState.RUNNING]);
    });

    it('should render paused', () => {
      const result = pipe.transform(TimerState.PAUSED);
      expect(result).toEqual(HumanReadableStates[TimerState.PAUSED]);
    });

    it('should render idle', () => {
      const result = pipe.transform(TimerState.IDLE);
      expect(result).toEqual(HumanReadableStates[TimerState.IDLE]);
    });

    it('should render unknown', () => {
      const result = pipe.transform(9999999);
      expect(result).toEqual('Unknown');
    });
  });
});
