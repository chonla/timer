import { TimerState } from "../enums/timer-state.enum";

const HumanReadableStates: { [key in TimerState]: string } = {
    [TimerState.UNINITIALIZED]: 'Uninitialized',
    [TimerState.IDLE]: 'Idle',
    [TimerState.RUNNING]: 'Running',
    [TimerState.PAUSED]: 'Paused'
};

export { HumanReadableStates }