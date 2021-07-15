import { Pipe, PipeTransform } from '@angular/core';
import { TimerState } from '../enums/timer-state.enum';

@Pipe({
  name: 'readableState'
})
export class ReadableStatePipe implements PipeTransform {

  transform(state: TimerState): string {
    const readableStates = {
      0: 'Uninitialized',
      1: 'Idle',
      2: 'Running',
      3: 'Paused'
    }
    return readableStates[state];
  }

}
