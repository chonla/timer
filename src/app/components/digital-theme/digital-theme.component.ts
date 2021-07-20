import { Component, Input, OnInit } from '@angular/core';
import { TimerState } from 'src/app/enums/timer-state.enum';

@Component({
  selector: 'app-digital-theme',
  templateUrl: './digital-theme.component.html',
  styleUrls: ['./digital-theme.component.sass']
})
export class DigitalThemeComponent implements OnInit {
  @Input() ticks: number = 0;
  @Input() totalTicks: number = 0;
  @Input() state: TimerState = TimerState.UNINITIALIZED;

  constructor() { }

  ngOnInit(): void {
  }

}
