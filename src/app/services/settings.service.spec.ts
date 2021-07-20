import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
  // let originalLocalStorage: Storage;
  // let mockLocalStorage = {
  //   getItem: jest.fn(),
  //   setItem: jest.fn(),
  //   removeItem: jest.fn(),
  //   clear: jest.fn(),
  //   key: jest.fn(),
  //   length: 0
  // };

  beforeEach(() => {
    // originalLocalStorage = global.localStorage;
    // global.localStorage = mockLocalStorage;
    localStorage.clear();
    jest.clearAllMocks();
    
    service = new SettingsService();
  });

  // afterEach(() => {
  //   global.localStorage = originalLocalStorage;
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data to local storage', () => {
    jest.spyOn(localStorage, 'setItem');

    service.update('darkMode', true);

    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith('bayo.timer', expect.any(String));
  });

  it('should load data to local storage', () => {
    jest.spyOn(localStorage, 'getItem');

    service.load();

    expect(localStorage.getItem).toBeCalledTimes(1);
    expect(localStorage.getItem).toBeCalledWith('bayo.timer');
  });
});
