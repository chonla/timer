import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TimerState } from '../../enums/timer-state.enum';
import { path as d3path } from 'd3';

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

  constructor() {
    this.arc = 'M0,0';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderTicks();
  }

  ngOnInit(): void {
    this.renderTicks();
  }

  public renderTicks(): void {
    const context = d3path();
    let portion = this.ticks / this.totalTicks;
    if (portion === 0.0 && this.ticks > 0) {
      portion = 1.0;
    }
    context.arc(0, 0, this.watchFaceRadiusSize, 0, portion * 2 * Math.PI, false);

    this.arc = context.toString();
  }

}
