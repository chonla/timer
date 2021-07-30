import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer/timer.component';
import { ControllerComponent } from './components/controller/controller.component';
import { SwitchComponent } from './components/switch/switch.component';
import { PresetButtonComponent } from './components/preset-button/preset-button.component';
import { DeveloperThemeComponent } from './components/developer-theme/developer-theme.component';
import { ReadableStatePipe } from './pipes/readable-state.pipe';
import { DigitalThemeComponent } from './components/digital-theme/digital-theme.component';
import { ToTimePipe } from './pipes/to-time.pipe';
import { GoogleThemeComponent } from './components/google-theme/google-theme.component';
import { CustomTimeModalComponent } from './components/custom-time-modal/custom-time-modal.component';
import { ScrollableDigitComponent } from './components/scrollable-digit/scrollable-digit.component';
import { SandclockThemeComponent } from './components/sandclock-theme/sandclock-theme.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ControllerComponent,
    SwitchComponent,
    PresetButtonComponent,
    DeveloperThemeComponent,
    ReadableStatePipe,
    DigitalThemeComponent,
    ToTimePipe,
    GoogleThemeComponent,
    CustomTimeModalComponent,
    ScrollableDigitComponent,
    SandclockThemeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
