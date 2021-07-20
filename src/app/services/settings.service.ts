import { Injectable } from '@angular/core';
import _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { DefaultSound } from '../constants/sounds';
import { DefaultTheme } from '../constants/themes';
import { ISettings } from '../interfaces/setting.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public _settingSource$: Subject<ISettings>;

  private _settings: ISettings;

  constructor() {
    this._settings = {
      useSound: true,
      darkMode: false,
      selectedSound: DefaultSound,
      selectedTheme: DefaultTheme
    };
    this._settingSource$ = new Subject();
  }

  public update(key: string, value: boolean | string): void {
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
    }
  }

  public load(): ISettings {
    const settings = localStorage.getItem('bayo.timer');
    if (settings !== null) {
      try {
        const json = JSON.parse(settings);
        this._settings = json;
        this._settingSource$.next(this._settings);
      } catch (e) {
      }
    }
    return _.cloneDeep(this._settings);
  }

  public onSettingChanged$(): Observable<ISettings> {
    return this._settingSource$.asObservable();
  }

  public restore(): void {
    this.load();
  }

  private _syncSettings(): void {
    localStorage.setItem('bayo.timer', JSON.stringify(this._settings));
    this._settingSource$.next(this._settings);
  }
}
