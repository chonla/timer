import { Injectable } from '@angular/core';
import _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { configurations } from '../constants/configurations';
import { ISettings } from '../interfaces/setting.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public _settingSource$: Subject<ISettings>;

  private _settings: ISettings;

  constructor() {
    this._settings = {
      useSound: configurations.defaultUseSound,
      darkMode: configurations.defaultDarkMode,
      selectedSound: configurations.defaultSound,
      selectedTheme: configurations.defaultTheme,
      customTimers: configurations.defaultCustomTimers,
    };
    this._settingSource$ = new Subject();
  }

  public update(key: string, value: boolean | string | number[]): void {
    switch (key) {
      case 'darkMode':
        this._settings.darkMode = value as boolean;
        this._syncSettings();
        break;
      case 'useSound':
        this._settings.useSound = value as boolean;
        this._syncSettings();
        break;
      case 'selectedTheme':
        this._settings.selectedTheme = value as string;
        this._syncSettings();
        break;
      case 'selectedSound':
        this._settings.selectedSound = value as string;
        this._syncSettings();
        break;
      case 'customTimers':
        this._settings.customTimers = value as number[];
        this._syncSettings();
        break;
    }
  }

  public load(): ISettings {
    const settings = localStorage.getItem('bayo.timer');
    if (settings !== null && settings !== '') {
      try {
        const json = JSON.parse(settings);
        this._settings = json;
        this._settingSource$.next(this._settings);
      } catch (e) {
        this.restoreDefault();
      }
    } else {
      this.restoreDefault();
    }
    return _.cloneDeep(this._settings);
  }

  public onSettingChange$(): Observable<ISettings> {
    return this._settingSource$.asObservable();
  }

  private restoreDefault(): void {
    this._settings = {
      darkMode: configurations.defaultDarkMode,
      useSound: configurations.defaultUseSound,
      selectedSound: configurations.defaultSound,
      selectedTheme: configurations.defaultTheme,
      customTimers: configurations.defaultCustomTimers,
    };
    this._settingSource$.next(this._settings);
  }

  private _syncSettings(): void {
    localStorage.setItem('bayo.timer', JSON.stringify(this._settings));
    this._settingSource$.next(this._settings);
  }
}
