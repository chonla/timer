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
    ToTimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
