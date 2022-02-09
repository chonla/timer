import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { configurations } from 'src/app/constants/configurations';

@Component({
  selector: 'app-custom-time-modal',
  templateUrl: './custom-time-modal.component.html',
  styleUrls: ['./custom-time-modal.component.sass']
})
export class CustomTimeModalComponent implements OnInit, OnChanges {
  @Input() closed: boolean = true;
  @Output('close') onClose: EventEmitter<void>;
  @Output('submit') onSubmit: EventEmitter<number>;

  private _ss: number;
  private _s: number;
  private _mm: number;
  private _m: number;
  private _ticks: number;

  constructor() {
    this.onClose = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this._ss = 0;
    this._s = 0;
    this._mm = 0;
    this._m = 0;
    this._ticks = 0;
  }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public closeModal(): void {
    this.closed = true;
    this.onClose.emit();
  }

  public onDigitChange($event: number, position: string): void {
    switch (position) {
      case 'ss':
        this._ss = $event;
        break;
      case 's':
        this._s = $event;
        break;
      case 'mm':
        this._mm = $event;
        break;
      case 'm':
        this._m = $event;
        break;
    }

    this._ticks = ((((this._mm * 10) + this._m) * 60) + ((this._ss * 10) + this._s));
  }

  public canSubmit(): boolean {
    return this._ticks !== 0;
  }

  public submit(): void {
    if (this.canSubmit()) {
      this.onSubmit.emit(this._ticks);
      this.closeModal();
    }
  }
}
