import { Input, Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerState } from '../../enums/timer-state.enum';
import { TimerService } from '../../services/timer.service';
import { configurations } from '../../constants/configurations';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {
  @Input() theme: string = '';
  @Input() darkMode: boolean = false;

  public totalTicks: number;
  public ticks: number;
  public state: TimerState;
  public attentionRequired: boolean;

  private destroy$: ReplaySubject<boolean>;

  constructor(private timer: TimerService) {
    this.totalTicks = 0;
    this.ticks = 0;
    this.state = TimerState.UNINITIALIZED;
    this.attentionRequired = false;
    this.destroy$ = new ReplaySubject(1);
  }

  public ngOnInit(): void {
    this.timer.onTicksChange$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(ticks => {
        this.ticks = ticks;
        this.totalTicks = this.timer.getTicks().ticks();
        if (this.ticks <= configurations.attentionRequiredAt * configurations.ticksPerSecond) {
          this.attentionRequired = true;
        }
      });

    this.timer.onStateChange$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: TimerState) => {
        if (this.state === TimerState.IDLE && state === TimerState.RUNNING) {
          this.attentionRequired = false;
        }
        this.state = state;
      });
  }

}
