import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TimerState } from '../../enums/timer-state.enum';
import { SvgService } from '../../services/svg.service';

@Component({
  selector: 'app-google-theme',
  templateUrl: './google-theme.component.html',
  styleUrls: ['./google-theme.component.sass']
})
export class GoogleThemeComponent implements OnInit, OnChanges {
  @Input() ticks: number = 0;
  @Input() totalTicks: number = 0;
  @Input() state: TimerState = TimerState.UNINITIALIZED;
  @Input() darkMode: boolean = false;
  @Input() attentionRequired: boolean = false;

  public arc: string;

  private readonly watchFaceRadiusSize: number = 49.5;

  constructor(private svg: SvgService) {
    this.arc = 'M0,0';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderTicks();
  }

  ngOnInit(): void {
    this.renderTicks();
  }

  public renderTicks(): void {
    let portion = this.ticks / this.totalTicks;
    if (portion === 0.0 && this.ticks > 0) {
      portion = 1.0;
    }
    this.arc = this.svg.circularArc(0, 0, this.watchFaceRadiusSize, 0, portion * 2 * Math.PI, false);

    // this.arc = context.toString();
  }

}
