import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    service = new TimerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set default ticks to 0 when initialized', () => {
    expect(service.getTicks()).toEqual(0);
  });

  it('should set timer', () => {
    service.setTicks(300);
    expect(service.getTicks()).toEqual(300);
  });

  it('should trigger timer change when set ticks', (done) => {
    service.onTimeChange().subscribe(ticks => {
      expect(ticks).toEqual(300);
      done();
    });
    service.setTicks(300);
  });
});
