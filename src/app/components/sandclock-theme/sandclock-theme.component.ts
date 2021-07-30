import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TimerState } from 'src/app/enums/timer-state.enum';

@Component({
  selector: 'app-sandclock-theme',
  templateUrl: './sandclock-theme.component.html',
  styleUrls: ['./sandclock-theme.component.sass']
})
export class SandclockThemeComponent implements OnInit {
  @Input() ticks: number = 0;
  @Input() totalTicks: number = 0;
  @Input() state: TimerState = TimerState.UNINITIALIZED;
  @Input() darkMode: boolean = false;
  @Input() attentionRequired: boolean = false;

  public readonly upperContainerMaxPixel: number = 38;
  public readonly upperContainerSizePixel: number = 53;
  public readonly duneMaxPixel = 34;
  public sandTop: number = 0;
  public sandHeight: number = 0;
  public duneHeight: number = 0;
  public dune: string = '';

  private readonly minPortion: number = 0.2;

  constructor() { }

  ngOnInit(): void {
    this.measureSands();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.measureSands();
  }

  public isRunning(): boolean {
    return this.state === TimerState.RUNNING;
  }

  private measureSands(): void {
    let portion = 0.0;

    if (this.totalTicks > 0) {
      portion = this.ticks / this.totalTicks;
    }

    this.sandHeight = portion * this.upperContainerMaxPixel;
    this.sandTop = this.upperContainerSizePixel - this.sandHeight;
    this.duneHeight = (1 - portion) * this.duneMaxPixel;
    if (this.duneHeight === 0.0) {
      this.dune = `M16 50Z`;
    } else {
      this.dune = `M16 50C42 ${45 - this.duneHeight} 38 ${45 - this.duneHeight} 64 50Z`;
    }
  }
}
