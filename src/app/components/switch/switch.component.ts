import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.sass']
})
export class SwitchComponent implements OnInit {
  @Input('value') value: boolean = false;
  @Output('toggled') onChange: EventEmitter<boolean> = new EventEmitter();
  public componentId: string;

  constructor() {
    this.componentId = uuidv4();
  }

  ngOnInit(): void {
  }

  change($event: Event): void {
    this.onChange.emit(($event.target as HTMLInputElement).checked);
  }

}
