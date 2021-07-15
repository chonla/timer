import { Component, Input, OnInit } from '@angular/core';
import { TimerState } from '../../enums/timer-state.enum';

@Component({
  selector: 'app-developer-theme',
  templateUrl: './developer-theme.component.html',
  styleUrls: ['./developer-theme.component.sass']
})
export class DeveloperThemeComponent implements OnInit {
  @Input() ticks: number = 0;
  @Input() totalTicks: number = 0;
  @Input() state: TimerState = TimerState.UNINITIALIZED;

  constructor() { }

  ngOnInit(): void {
  }

}
