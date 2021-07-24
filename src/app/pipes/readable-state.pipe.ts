import { Pipe, PipeTransform } from '@angular/core';
import { HumanReadableStates } from '../constants/states';
import { TimerState } from '../enums/timer-state.enum';

@Pipe({
  name: 'readableState'
})
export class ReadableStatePipe implements PipeTransform {

  transform(state: TimerState): string {
    if (state in TimerState) {
      return HumanReadableStates[state];
    }
    return 'Unknown';
  }

}
