import { configurations } from '../constants/configurations';
import { ToTimePipe } from './to-time.pipe';

describe('ToTimePipe', () => {
  let pipe: ToTimePipe;

  beforeEach(() => {
    pipe = new ToTimePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should render 1 digit second correctly', () => {
    const result = pipe.transform(9 * configurations.ticksPerSecond);

    expect(result).toBe('00:09');
  });

  it('should render 2 digits second correctly', () => {
    const result = pipe.transform(19 * configurations.ticksPerSecond);

    expect(result).toBe('00:19');
  });

  it('should render 1 digit minute correctly', () => {
    const result = pipe.transform(60 * configurations.ticksPerSecond);

    expect(result).toBe('01:00');
  });

  it('should render 2 digits minute correctly', () => {
    const result = pipe.transform(600 * configurations.ticksPerSecond);

    expect(result).toBe('10:00');
  });

  it('should render 2 digits minute and 2 digits second correctly', () => {
    const result = pipe.transform(754 * configurations.ticksPerSecond);

    expect(result).toBe('12:34');
  });
});
