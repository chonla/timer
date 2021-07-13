import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.sass']
})
export class ControllerComponent implements OnInit {
  public useSound: boolean;

  constructor() {
    this.useSound = true;
  }

  ngOnInit(): void {
  }

  public soundToggled(checked: boolean): void {
    this.useSound = checked;
  }

}
