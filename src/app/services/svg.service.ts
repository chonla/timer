import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SvgService {
  private readonly PI = Math.PI;
  private readonly TAU = 2 * this.PI;
  private readonly EPSILON = 1e-6; // some possible error
  private readonly TAU_EPSILON = this.TAU - this.EPSILON; // large portion of circular arc, almost complete circle

  constructor() { }

  /**
   * circularArc
   * Ported and simplified from d3.path().arc() function
   * @param x 
   * @param y 
   * @param radius 
   * @param startAngle 
   * @param endAngle 
   * @param counterClockwise 
   * @returns 
   */
  circularArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterClockwise: boolean): string {
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;
    const clockwiseship = counterClockwise ? 0 : 1;

    let diffAngle = counterClockwise ? startAngle - endAngle : endAngle - startAngle;
    let d = "";

    // Is the radius negative? Error.
    if (radius < 0) throw new Error("negative radius: " + radius);

    d += `M${x0},${y0}`;

    // Is this arc empty? We’re done.
    if (radius === 0.0) {
      return d;
    }

    // Does the angle go the wrong way? Flip the direction.
    if (diffAngle < 0) {
      diffAngle = diffAngle % this.TAU + this.TAU;
    }

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (diffAngle > this.TAU_EPSILON) {
      d += `A${radius},${radius},0,1,${clockwiseship},${(x - dx)},${(y - dy)}A${radius},${radius},0,1,${clockwiseship},${x0},${y0}`;
    }

    // Is this arc non-empty? Draw an arc!
    else {
      if (diffAngle > this.EPSILON) {
        d += `A${radius},${radius},0,${(+(diffAngle >= this.PI))},${clockwiseship},${(x + radius * Math.cos(endAngle))},${(y + radius * Math.sin(endAngle))}`;
      }
    }
    return d;
  }

}
