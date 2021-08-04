import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerState } from '../../enums/timer-state.enum';
import { configurations } from '../../constants/configurations';
import { AvailableSounds } from '../../constants/sounds';
import { AvailableThemes } from '../../constants/themes';
import { ISettings } from '../../interfaces/setting.interface';
import { ISound } from '../../interfaces/sound.interface';
import { ITheme } from '../../interfaces/themes.interface';
import { SettingsService } from '../../services/settings.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent implements OnInit {
  @Output('themeChange') onThemeChange: EventEmitter<string> = new EventEmitter<string>();

  public themes: ITheme[] = AvailableThemes;
  public sounds: ISound[] = AvailableSounds;
  public selectedTheme: string;
  public selectedSound: string;
  public useSound: boolean;
  public darkMode: boolean;
  public customTimers: number[];
  public settingClosed: boolean;
  public customModalClosed: boolean;

  private destroy$: ReplaySubject<boolean>;

  constructor(private timer: TimerService, private settings: SettingsService) {
    this.destroy$ = new ReplaySubject(1);
    this.useSound = configurations.defaultUseSound;
    this.darkMode = configurations.defaultDarkMode;
    this.selectedTheme = configurations.defaultTheme;
    this.selectedSound = configurations.defaultSound;
    this.customTimers = [];
    this.settingClosed = false;
    this.customModalClosed = true;
  }

  ngOnInit(): void {
    this.timer.onStateChange$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: TimerState) => {
        if (state === TimerState.RUNNING) {
          this.closeCustomModal();
        }
      });

    this.settings.onSettingChange$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((settings: ISettings) => {
        this.darkMode = settings.darkMode;
        this.useSound = settings.useSound;
        this.selectedSound = settings.selectedSound;
        this.selectedTheme = settings.selectedTheme;
        this.customTimers = settings.customTimers ? settings.customTimers : [];
      });

    this.settings.load();
  }

  public soundToggled(checked: boolean): void {
    this.useSound = checked;
    this.settings.update('useSound', checked);
  }

  public darkModeToggled(checked: boolean): void {
    this.darkMode = checked;
    this.settings.update('darkMode', checked);
  }

  public themeChange($event: Event): void {
    const theme: string = ($event.target as HTMLSelectElement).value;
    this.onThemeChange.emit(theme);
    this.settings.update('selectedTheme', theme);
  }

  public soundChange($event: Event): void {
    const theme: string = ($event.target as HTMLSelectElement).value;
    this.settings.update('selectedSound', theme);
  }

  public setTime(seconds: number): void {
    this.timer.setTicks(seconds);
  }

  public openSettings(): void {
    this.settingClosed = false;
  }

  public closeSettings(): void {
    this.settingClosed = true;
  }

  public openCustomModal(): void {
    this.customModalClosed = false;
  }

  public closeCustomModal(): void {
    this.customModalClosed = true;
  }

  public onTimerModalClosed(): void {
    this.customModalClosed = true;
  }

  public onCreateCustomTime($event: number): void {
    this.customTimers.push($event);
    this.settings.update('customTimers', this.customTimers);
  }

  public deleteTime(index: number): void {
    this.customTimers.splice(index, 1);
    this.settings.update('customTimers', this.customTimers);
  }

  public shouldDisableTimeSetButton(): boolean {
    return this.timer.isRunning() || this.timer.isPaused();
  }
}
