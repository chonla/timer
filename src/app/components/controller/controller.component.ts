import { Component, Input, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.sass']
})
export class ControllerComponent implements OnInit {
  @Input() darkMode: boolean = false;

  constructor(private timer: TimerService) { //}, private settings: SettingsService) {
  }

  public ngOnInit(): void {
  }

  public start(): void {
    this.timer.start();
    // this.closeSettings();
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

  public shouldShowPlayButton(): boolean {
    return this.timer.isIdle() || this.timer.isUninitialized();
  }

  public shouldShowResumeButton(): boolean {
    return this.timer.isRunning() || this.timer.isPaused();
  }

  public shouldDisablePauseButton(): boolean {
    return !this.timer.isRunning() || this.timer.isUninitialized();
  }

  public shouldDisableStopButton(): boolean {
    return this.timer.isIdle() || this.timer.isUninitialized();
  }

  public shouldDisablePlayButton(): boolean {
    return this.timer.isUninitialized();
  }

  public shouldDisableResumeButton(): boolean {
    return !this.timer.isPaused()
  }
}
