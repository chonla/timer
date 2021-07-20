import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preset-button',
  templateUrl: './preset-button.component.html',
  styleUrls: ['./preset-button.component.sass']
})
export class PresetButtonComponent implements OnInit {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Output('clicked') onClicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public clicked(): void {
    this.onClicked.emit();
  }

}
