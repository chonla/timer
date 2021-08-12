import { configurations } from "../constants/configurations";

class Ticks {
    private _ticks: number;
    private _tickLeft: number;
    constructor(seconds: number) {
        this._ticks = seconds * configurations.ticksPerSecond;
        this._tickLeft = this._ticks;
    }

    ticking(): void {
        this._tickLeft--;
    }

    reset(): void {
        this._tickLeft = this._ticks;
    }

    ticks(): number {
        return this._ticks;
    }

    tickLeft(): number {
        return this._tickLeft;
    }
}

export default Ticks