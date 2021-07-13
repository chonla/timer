import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private _ticks: number;
  private _ticksSource$: Subject<number>;

  constructor() {
    this._ticks = 0;
    this._ticksSource$ = new Subject<number>();
    this.setTicks(0);
  }

  public onTimeChange(): Observable<number> {
    return this._ticksSource$.asObservable();
  }

  public setTicks(seconds: number) {
    this._ticks = Math.floor(seconds);
    this._ticksSource$.next(this._ticks);
  }

  public getTicks(): number {
    return this._ticks;
  }
}
