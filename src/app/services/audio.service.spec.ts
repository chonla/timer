import { AudioService } from './audio.service';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    service = new AudioService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
