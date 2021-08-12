import { Pipe, PipeTransform } from '@angular/core';
import { configurations } from '../constants/configurations';

@Pipe({
  name: 'toTime'
})
export class ToTimePipe implements PipeTransform {

  transform(ticks: number): string {
    const seconds = Math.floor(ticks / configurations.ticksPerSecond);
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

}
