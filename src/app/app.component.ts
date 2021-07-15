import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public selectedTheme: string;

  constructor() {
    this.selectedTheme = '';
  }

  public themeChanged(theme: string): void {
    console.log(theme);
  }
}
