import { SvgService } from './svg.service';

describe('SvgService', () => {
  let service: SvgService;

  beforeEach(() => {
    service = new SvgService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
