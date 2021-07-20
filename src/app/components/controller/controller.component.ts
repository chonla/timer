import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvailableThemes, DefaultTheme } from '../../constants/themes';
import { TimerState } from '../../enums/timer-state.enum';
import { TimerService } from '../../services/timer.service';
import { ITheme } from '../../interfaces/themes.interface';
import { ISound } from '../../interfaces/sound.interface';
import { AvailableSounds, DefaultSound } from '../../constants/sounds';
import { SettingsService } from 'src/app/services/settings.service';
import { ISettings } from 'src/app/interfaces/setting.interface';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.sass']
})
export class ControllerComponent implements OnInit {
  @Output('themeChanged') onThemeChanged: EventEmitter<string> = new EventEmitter<string>();

  public themes: ITheme[] = AvailableThemes;
  public sounds: ISound[] = AvailableSounds;
  public selectedTheme: string = DefaultTheme;
  public selectedSound: string = DefaultSound;
  public useSound: boolean;
  public state: TimerState;
  public darkMode: boolean;
  public settingClosed: boolean;

  private destroy$: ReplaySubject<boolean>;

  constructor(private timer: TimerService, private settings: SettingsService) {
    this.destroy$ = new ReplaySubject(1);
    this.useSound = true;
    this.darkMode = false;
    this.state = TimerState.UNINITIALIZED;
    this.settingClosed = false;

    this.timer.onStateChange$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.state = state;
      });

    this.settings.onSettingChanged$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((settings: ISettings) => {
        this.darkMode = settings.darkMode;
        this.useSound = settings.useSound;
        this.selectedSound = settings.selectedSound;
        this.selectedTheme = settings.selectedTheme;
      });
  }

  ngOnInit(): void {
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

  public themeChanged($event: Event): void {
    const theme: string = ($event.target as HTMLSelectElement).value;
    this.onThemeChanged.emit(theme);
    this.settings.update('selectedTheme', theme);
  }

  public soundChanged($event: Event): void {
    const theme: string = ($event.target as HTMLSelectElement).value;
    this.settings.update('selectedSound', theme);
  }

  public start(): void {
    this.timer.start();
  }

  public pause(): void {
    this.timer.pause();
  }

  public resume(): void {
    this.timer.resume();
  }

  public stop(): void {
    this.timer.stop();
  }

  public setTime(seconds: number): void {
    this.timer.setTicks(seconds);
  }

  public isIdle(): boolean {
    return this.state === TimerState.IDLE;
  }

  public isRunning(): boolean {
    return this.state === TimerState.RUNNING;
  }

  public isPaused(): boolean {
    return this.state === TimerState.PAUSED;
  }

  public isUninitialized(): boolean {
    return this.state === TimerState.UNINITIALIZED;
  }

  public shouldShowPlayButton(): boolean {
    return this.isIdle() || this.isUninitialized();
  }

  public shouldShowResumeButton(): boolean {
    return !this.isIdle() && !this.isUninitialized();
  }

  public shouldDisablePauseButton(): boolean {
    return !this.isRunning() || this.isUninitialized();
  }

  public shouldDisableStopButton(): boolean {
    return this.isIdle() || this.isUninitialized();
  }

  public shouldDisableTimeSetButton(): boolean {
    return this.isRunning() || this.isPaused();
  }

  public openSettings(): void {
    this.settingClosed = false;
  }

  public closeSettings(): void {
    this.settingClosed = true;
  }
}
