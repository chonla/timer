import { SvgService } from './svg.service';

describe('SvgService', () => {
  let service: SvgService;

  beforeEach(() => {
    service = new SvgService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a minimal path if no radius provided for arc', () => {
    const x = 0;
    const y = 0;
    const radius = 0;
    const startAngle = 0;
    const endAngle = Math.PI;
    const counterClockwise = false;
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;
    const result = service.circularArc(x, y, radius, startAngle, endAngle, counterClockwise);
    expect(result).toEqual(`M${x0},${y0}`);
  });

  it('should move the origin coordination to given x, y', () => {
    const x = 10;
    const y = 20;
    const radius = 0;
    const startAngle = 0;
    const endAngle = Math.PI;
    const counterClockwise = false;
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;
    const result = service.circularArc(x, y, radius, startAngle, endAngle, counterClockwise);
    expect(result).toEqual(`M${x0},${y0}`);
  });

  it('should draw a nothing if arc has too small angle', () => {
    const x = 10;
    const y = 20;
    const radius = 40;
    const startAngle = 0;
    const endAngle = startAngle + (1e-6 - 1e-7);
    const counterClockwise = false;
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;

    const result = service.circularArc(x, y, radius, startAngle, endAngle, counterClockwise);
    expect(result).toEqual(`M${x0},${y0}`);
  });

  it('should draw a full circle if arc is almost a complete circle', () => {
    const x = 10;
    const y = 20;
    const radius = 40;
    const startAngle = 0;
    const endAngle = 2 * Math.PI - (1e-6 - 1e-7);
    const counterClockwise = false;
    const clockwiseship = counterClockwise?0:1;
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;

    const result = service.circularArc(x, y, radius, startAngle, endAngle, counterClockwise);
    expect(result).toEqual(`M${x0},${y0}A${radius},${radius},0,1,${clockwiseship},${(x - dx)},${(y - dy)}A${radius},${radius},0,1,${clockwiseship},${x0},${y0}`);
  });

  it('should draw an arc smaller than PI', () => {
    const x = 10;
    const y = 20;
    const radius = 40;
    const startAngle = 0;
    const endAngle = Math.PI - 1e-6;
    const counterClockwise = false;
    const clockwiseship = counterClockwise?0:1;
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;
    const diffAngle = endAngle - startAngle;

    const result = service.circularArc(x, y, radius, startAngle, endAngle, counterClockwise);
    expect(result).toEqual(`M${x0},${y0}A${radius},${radius},0,${(+(diffAngle >= Math.PI))},${clockwiseship},${(x + radius * Math.cos(endAngle))},${(y + radius * Math.sin(endAngle))}`);
  });

  it('should draw an arc with size of PI', () => {
    const x = 10;
    const y = 20;
    const radius = 40;
    const startAngle = 0;
    const endAngle = Math.PI;
    const counterClockwise = false;
    const clockwiseship = counterClockwise?0:1;
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;
    const diffAngle = endAngle - startAngle;

    const result = service.circularArc(x, y, radius, startAngle, endAngle, counterClockwise);
    expect(result).toEqual(`M${x0},${y0}A${radius},${radius},0,${(+(diffAngle >= Math.PI))},${clockwiseship},${(x + radius * Math.cos(endAngle))},${(y + radius * Math.sin(endAngle))}`);
  });

  it('should draw an arc larger than PI', () => {
    const x = 10;
    const y = 20;
    const radius = 40;
    const startAngle = 0;
    const endAngle = Math.PI + 1e-6;
    const counterClockwise = false;
    const clockwiseship = counterClockwise?0:1;
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;
    const diffAngle = endAngle - startAngle;

    const result = service.circularArc(x, y, radius, startAngle, endAngle, counterClockwise);
    expect(result).toEqual(`M${x0},${y0}A${radius},${radius},0,${(+(diffAngle >= Math.PI))},${clockwiseship},${(x + radius * Math.cos(endAngle))},${(y + radius * Math.sin(endAngle))}`);
  });

  it('should draw an arc correctly when angle is negative', () => {
    const x = 10;
    const y = 20;
    const radius = 40;
    const startAngle = Math.PI + 1e-6;
    const endAngle = 0;
    const counterClockwise = false;
    const clockwiseship = counterClockwise?0:1;
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;
    const diffAngle = endAngle - startAngle;

    const result = service.circularArc(x, y, radius, startAngle, endAngle, counterClockwise);
    expect(result).toEqual(`M${x0},${y0}A${radius},${radius},0,${(+(diffAngle >= Math.PI))},${clockwiseship},${(x + radius * Math.cos(endAngle))},${(y + radius * Math.sin(endAngle))}`);
  });

  it('should throw an error if radius is negative', () => {
    const x = 0;
    const y = 0;
    const radius = -1;
    const startAngle = 0;
    const endAngle = Math.PI;
    const counterClockwise = false;
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;
    expect(() => {
      service.circularArc(x, y, radius, startAngle, endAngle, counterClockwise);
    }).toThrowError(new Error('negative radius: -1'));
  });

  it('should draw an arc in counter clockwise direction', () => {
    const x = 10;
    const y = 20;
    const radius = 40;
    const startAngle = 0;
    const endAngle = Math.PI + 1e-6;
    const counterClockwise = true;
    const clockwiseship = counterClockwise?0:1;
    const dx = radius * Math.cos(startAngle);
    const dy = radius * Math.sin(startAngle);
    const x0 = x + dx;
    const y0 = y + dy;
    const diffAngle = startAngle - endAngle;

    const result = service.circularArc(x, y, radius, startAngle, endAngle, counterClockwise);
    expect(result).toEqual(`M${x0},${y0}A${radius},${radius},0,${(+(diffAngle >= Math.PI))},${clockwiseship},${(x + radius * Math.cos(endAngle))},${(y + radius * Math.sin(endAngle))}`);
  });
});
