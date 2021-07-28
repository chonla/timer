import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scrollable-digit',
  templateUrl: './scrollable-digit.component.html',
  styleUrls: ['./scrollable-digit.component.sass']
})
export class ScrollableDigitComponent implements OnInit {
  @Input() digits: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
