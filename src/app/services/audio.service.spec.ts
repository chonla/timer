import { AvailableSounds } from '../constants/sounds';
import { AudioService } from './audio.service';
import axios from 'axios';
import { concat } from 'rxjs';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    service = new AudioService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Preload audio data', () => {
    afterEach(() => {
      AvailableSounds.pop();
      jest.clearAllMocks();
    });

    it('should preload audio binary content into internal cache when call load', (done) => {
      const mockAudio = ({
        load: jest.fn()
      } as unknown) as HTMLMediaElement;
      AvailableSounds.push({
        key: 'test-sound',
        label: 'Test',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
      });

      jest.spyOn(axios, 'get');
      jest.spyOn(window, 'Audio').mockReturnValue(mockAudio);

      service.load('test-sound').then(() => {
        expect(axios.get).toBeCalledTimes(1);
        expect(axios.get).toBeCalledWith(AvailableSounds[AvailableSounds.length - 1].url, { responseType: 'blob' });
        done();
      });
    });

    it('should preload audio binary content into internal cache only once when call load the existing key more than one time', (done) => {
      const mockAudio = ({
        load: jest.fn()
      } as unknown) as HTMLMediaElement;
      AvailableSounds.push({
        key: 'test-sound',
        label: 'Test',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
      });

      jest.spyOn(axios, 'get');
      jest.spyOn(window, 'Audio').mockReturnValue(mockAudio);

      service.load('test-sound').then(() => {
        service.load('test-sound').then(() => {
          expect(axios.get).toBeCalledTimes(1);
          expect(axios.get).toBeCalledWith(AvailableSounds[AvailableSounds.length - 1].url, { responseType: 'blob' });
          done();
        });
      });
    });

    it('should not preload non-existing audio', (done) => {
      AvailableSounds.push({
        key: 'test-sound',
        label: 'Test',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
      });

      jest.spyOn(axios, 'get');

      service.load('test-video').then(() => {
        fail('this part of code should not be reached.');
      }).catch(() => {
        expect(axios.get).toBeCalledTimes(0);
        done();
      });
    });
  });

  describe('Playback', () => {
    it('should play an audio in cache if recently loaded content is in cache', (done) => {
      const mockAudio = ({
        load: jest.fn(),
        play: jest.fn()
      } as unknown) as HTMLMediaElement;
      AvailableSounds.push({
        key: 'test-sound',
        label: 'Test',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
      });

      jest.spyOn(axios, 'get');
      jest.spyOn(window, 'Audio').mockReturnValue(mockAudio);

      service.load('test-sound').then(() => {
        service.play();

        expect(mockAudio.play).toBeCalledTimes(1);
        done();
      });
    });
  });
});
