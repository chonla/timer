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
  public colorScheme: string;
  private destroy$: ReplaySubject<boolean>;

  constructor(private settings: SettingsService) {
    this.selectedTheme = DefaultTheme;
    this.colorScheme = '';
    this.destroy$ = new ReplaySubject(1);
  }

  public ngOnInit(): void {
    this.settings.onSettingChanged$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((settings: ISettings) => {
        this.colorScheme = settings.darkMode ? 'dark' : 'default';
      });
  }

  public themeChanged(theme: string): void {
    this.selectedTheme = theme;
  }
}
