import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scrollable-digit',
  templateUrl: './scrollable-digit.component.html',
  styleUrls: ['./scrollable-digit.component.sass']
})
export class ScrollableDigitComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() digitOptions: number[] = [];
  @Output('digitChange') onDigitChange: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('digits') digitsContainer !: ElementRef;

  private digitElementRefs: HTMLDivElement[] = [];
  private selectedDigit: number;

  constructor() {
    this.selectedDigit = -1;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateDigitMeasurement();
  }

  ngAfterViewInit(): void {
    this.updateDigitMeasurement();
  }

  public onDigitScroll($event: Event) {
    const div = ($event.target as HTMLDivElement)
    const newDigit = this.digitElementRefs.find((ref: HTMLDivElement) => ref.offsetTop === div.scrollTop);
    if (newDigit) {
      const newSelectedDigit = Number.parseInt(newDigit.innerText, 10);
      if (newSelectedDigit !== this.selectedDigit) {
        this.selectedDigit = newSelectedDigit
        this.onDigitChange.emit(this.selectedDigit);
      }
    }
  }

  private updateDigitMeasurement() {
    if (this.digitsContainer) {
      const div = (this.digitsContainer.nativeElement as HTMLDivElement);
      this.digitElementRefs = [];
      div.childNodes.forEach((node: ChildNode) => {
        const child = (<HTMLDivElement>node);
        this.digitElementRefs.push(child);
      });
      this.selectedDigit = Number.parseInt(this.digitElementRefs[0].innerText, 10);
    }
  }

}
