import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer/timer.component';
import { ControllerComponent } from './components/controller/controller.component';
import { SwitchComponent } from './components/switch/switch.component';
import { PresetButtonComponent } from './components/preset-button/preset-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ControllerComponent,
    SwitchComponent,
    PresetButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
