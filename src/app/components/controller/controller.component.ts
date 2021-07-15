import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvailableThemes, DefaultTheme } from '../../constants/themes';
import { TimerState } from '../../enums/timer-state.enum';
import { TimerService } from '../../services/timer.service';
import { ITheme } from '../../interfaces/themes.interface';
import { ISound } from '../../interfaces/sound.interface';
import { AvailableSounds, DefaultSound } from '../../constants/sounds';

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

  private destroy$: ReplaySubject<boolean>;

  constructor(private timer: TimerService) {
    this.destroy$ = new ReplaySubject(1);
    this.useSound = true;
    this.state = TimerState.UNINITIALIZED;

    this.timer.onStateChange$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.state = state;
      })
  }

  ngOnInit(): void {
  }

  public soundToggled(checked: boolean): void {
    this.useSound = checked;
  }

  public themeChanged($event: Event): void {
    this.onThemeChanged.emit(($event.target as HTMLSelectElement).value);
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
    return this.isIdle();
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
}
