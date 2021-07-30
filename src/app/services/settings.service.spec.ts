import { configurations } from '../constants/configurations';
import { IAppConfig } from '../interfaces/appconfig.interface';
import { ISettings } from '../interfaces/setting.interface';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    service = new SettingsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Auto-save settings', () => {
    it('should save data to local storage when update darkMode setting', () => {
      jest.spyOn(localStorage, 'setItem');

      service.update('darkMode', true);

      expect(localStorage.setItem).toBeCalledTimes(1);
      expect(localStorage.setItem).toBeCalledWith('bayo.timer', expect.any(String));
    });

    it('should save data to local storage when update useSound setting', () => {
      jest.spyOn(localStorage, 'setItem');

      service.update('useSound', true);

      expect(localStorage.setItem).toBeCalledTimes(1);
      expect(localStorage.setItem).toBeCalledWith('bayo.timer', expect.any(String));
    });

    it('should save data to local storage when update selectedTheme setting', () => {
      jest.spyOn(localStorage, 'setItem');

      service.update('selectedTheme', 'some-theme');

      expect(localStorage.setItem).toBeCalledTimes(1);
      expect(localStorage.setItem).toBeCalledWith('bayo.timer', expect.any(String));
    });

    it('should save data to local storage when update selectedSound setting', () => {
      jest.spyOn(localStorage, 'setItem');

      service.update('selectedSound', 'some-sound');

      expect(localStorage.setItem).toBeCalledTimes(1);
      expect(localStorage.setItem).toBeCalledWith('bayo.timer', expect.any(String));
    });

    it('should save data to local storage when update customTimers setting', () => {
      jest.spyOn(localStorage, 'setItem');

      service.update('customTimers', [10]);

      expect(localStorage.setItem).toBeCalledTimes(1);
      expect(localStorage.setItem).toBeCalledWith('bayo.timer', expect.any(String));
    });
  });

  describe('Load data from storage', () => {
    it('should load data to local storage', () => {
      jest.spyOn(localStorage, 'getItem');

      service.load();

      expect(localStorage.getItem).toBeCalledTimes(1);
      expect(localStorage.getItem).toBeCalledWith('bayo.timer');
    });

    it('should set settings to data loaded from storage', (done) => {
      const expectedSettings = { darkMode: false, useSound: false, selectedSound: "aa", selectedTheme: "bb" };

      jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(expectedSettings));
      jest.spyOn(service._settingSource$, 'next');

      service.onSettingChange$().subscribe((settings: ISettings) => {
        expect(service._settingSource$.next).toBeCalledWith(expectedSettings);
        expect(settings).toEqual(expectedSettings);

        done();
      });

      service.load();
    });

    it('should set settings to default setting if no previous setting', (done) => {
      const expectedSettings: ISettings = {
        darkMode: configurations.defaultDarkMode,
        useSound: configurations.defaultUseSound,
        selectedTheme: configurations.defaultTheme,
        selectedSound: configurations.defaultSound,
        customTimers: configurations.defaultCustomTimers
      };

      jest.spyOn(localStorage, 'getItem').mockReturnValue('');
      jest.spyOn(service._settingSource$, 'next');

      service.onSettingChange$().subscribe((settings: ISettings) => {
        expect(service._settingSource$.next).toBeCalledWith(expectedSettings);
        expect(settings).toEqual(expectedSettings);

        done();
      });

      service.load();
    });


    it('should set settings to default setting if previous setting is broken', (done) => {
      const expectedSettings: ISettings = {
        darkMode: configurations.defaultDarkMode,
        useSound: configurations.defaultUseSound,
        selectedTheme: configurations.defaultTheme,
        selectedSound: configurations.defaultSound,
        customTimers: configurations.defaultCustomTimers
      };

      jest.spyOn(localStorage, 'getItem').mockReturnValue('xxx');
      jest.spyOn(service._settingSource$, 'next');

      service.onSettingChange$().subscribe((settings: ISettings) => {
        expect(service._settingSource$.next).toBeCalledWith(expectedSettings);
        expect(settings).toEqual(expectedSettings);

        done();
      });

      service.load();
    });
  });
});
