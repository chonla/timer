import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerState } from '../../enums/timer-state.enum';
import { DefaultTheme } from '../../constants/themes';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {
  @Input() theme: string = '';

  public ticks: number;
  public state: TimerState;

  private destroy$: ReplaySubject<boolean>;

  constructor(private timer: TimerService) {
    this.ticks = 0;
    this.state = TimerState.UNINITIALIZED;
    this.destroy$ = new ReplaySubject(1);
  }

  ngOnInit(): void {
    this.timer.onTicksChange$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(ticks => {
        this.ticks = ticks;
      });

    this.timer.onStateChange$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.state = state;
      });
  }

}
