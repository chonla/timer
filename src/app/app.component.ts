import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { configurations } from './constants/configurations';
import { ISettings } from './interfaces/setting.interface';
import { AudioService } from './services/audio.service';
import { SettingsService } from './services/settings.service';
import { TimerService } from './services/timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public selectedTheme: string;
  public darkMode: boolean;
  public loaded: boolean;
  public useSound: boolean;
  private destroy$: ReplaySubject<boolean>;

  constructor(private settings: SettingsService, private timer: TimerService, private audio: AudioService) {
    this.selectedTheme = configurations.defaultTheme;
    this.darkMode = configurations.defaultDarkMode;
    this.useSound = false;
    this.destroy$ = new ReplaySubject(1);
    this.loaded = false;
  }

  public ngOnInit(): void {
    this.settings.onSettingChange$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((settings: ISettings) => {
        this.darkMode = settings.darkMode;
        this.selectedTheme = settings.selectedTheme;
        this.useSound = settings.useSound;
        if (this.useSound) {
          this.audio.load(settings.selectedSound);
        }
        this.loaded = true;
      });

    this.settings.load();

    this.timer.onTicksChange$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(ticks => {
        if (ticks === 0 && this.useSound) {
          this.audio.play();
        }
      });
  }
}
