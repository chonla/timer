import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DefaultTheme } from './constants/themes';
import { ISettings } from './interfaces/setting.interface';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public selectedTheme: string;
  public darkMode: boolean;
  private destroy$: ReplaySubject<boolean>;

  constructor(private settings: SettingsService) {
    this.selectedTheme = DefaultTheme;
    this.darkMode = false;
    this.destroy$ = new ReplaySubject(1);

    this.settings.onSettingChanged$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((settings: ISettings) => {
        this.darkMode = settings.darkMode;
        this.selectedTheme = settings.selectedTheme;
      });
  }

  public ngOnInit(): void {
  }
}
