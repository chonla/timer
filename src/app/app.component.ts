import { Component } from '@angular/core';
import { DefaultTheme } from './constants/themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public selectedTheme: string;

  constructor() {
    this.selectedTheme = DefaultTheme;
  }

  public themeChanged(theme: string): void {
    this.selectedTheme = theme;
  }
}
