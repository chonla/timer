import { Injectable } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { TimerState } from '../enums/timer-state.enum';
import { take } from 'rxjs/operators';
import Ticks from '../models/ticks';
import { configurations } from '../constants/configurations';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private _ticks: Ticks;
  // private _ticksLeft: number;
  private _ticksSource$: Subject<number>;
  private _state: TimerState;
  private _stateSource$: Subject<TimerState>;
  private _interval$: Subscription;

  constructor() {
    this._state = TimerState.UNINITIALIZED;
    this._stateSource$ = new Subject<TimerState>();
    this._ticks = new Ticks(0);
    // this._ticksLeft = 0;
    this._ticksSource$ = new Subject<number>();
    this._interval$ = new Subscription();
    this.setSeconds(0);
    this.setState(TimerState.UNINITIALIZED);
  }

  public getTicks(): Ticks {
    return this._ticks;
  }

  public setSeconds(seconds: number): void {
    this._ticks = new Ticks(Math.floor(seconds));
    // this._ticksLeft = this._ticks;
    // this._ticksSource$.next(this._ticksLeft);
    this._ticksSource$.next(this._ticks.tickLeft());
    if (this._ticks.ticks() > 0) {
      this.setState(TimerState.IDLE);
    }
  }

  public onTicksChange$(): Observable<number> {
    return this._ticksSource$.asObservable();
  }

  public getState(): TimerState {
    return this._state;
  }

  public onStateChange$(): Observable<TimerState> {
    return this._stateSource$.asObservable();
  }

  public start(): void {
    if (this._state === TimerState.IDLE) {
      this.setState(TimerState.RUNNING);

      // this._ticksLeft = this._ticks;
      this._ticks.reset();
      this._ticksSource$.next(this._ticks.tickLeft());

      this._interval$ = interval(1000/configurations.ticksPerSecond)
        .pipe(take(this._ticks.tickLeft()))
        .subscribe(t => {
          this.ticking();
        });
    }
  }

  public stop(): void {
    if (this._state === TimerState.RUNNING || this._state === TimerState.PAUSED) {
      if (!this._interval$.closed) {
        this._interval$.unsubscribe();
      }
      this.setState(TimerState.IDLE);
    }
  }

  public pause(): void {
    if (this._state === TimerState.RUNNING) {
      this._interval$.unsubscribe();
      this.setState(TimerState.PAUSED);
    }
  }

  public resume(): void {
    if (this._state === TimerState.PAUSED) {
      this.setState(TimerState.RUNNING);
      this._interval$ = interval(1000/configurations.ticksPerSecond)
        .pipe(take(this._ticks.tickLeft()))
        .subscribe(t => {
          this.ticking();
        });
    }
  }

  public isRunning(): boolean {
    return this._state === TimerState.RUNNING;
  }

  public isPaused(): boolean {
    return this._state === TimerState.PAUSED;
  }

  public isUninitialized(): boolean {
    return this._state === TimerState.UNINITIALIZED;
  }

  public isIdle(): boolean {
    return this._state === TimerState.IDLE;
  }

  private ticking(): void {
    // this._ticksLeft--;
    this._ticks.ticking();
    this._ticksSource$.next(this._ticks.tickLeft());
    if (this._ticks.tickLeft() === 0) {
      this._interval$.unsubscribe();
      this.setState(TimerState.IDLE);
    }
  }

  private setState(state: TimerState): void {
    this._state = state;
    this._stateSource$.next(this._state);
  }
}

