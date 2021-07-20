import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTime'
})
export class ToTimePipe implements PipeTransform {

  transform(ticks: number): string {
    const m = Math.floor(ticks / 60);
    const s = ticks % 60;
    
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

}
