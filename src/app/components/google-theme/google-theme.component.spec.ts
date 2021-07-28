import { SimpleChange, SimpleChanges } from '@angular/core';
import { SvgService } from 'src/app/services/svg.service';
import { GoogleThemeComponent } from './google-theme.component';

describe('GoogleThemeComponent', () => {
  let component: GoogleThemeComponent;
  let mockSvg: SvgService = ({
    circularArc: jest.fn()
  } as unknown) as SvgService;

  beforeEach(() => {
    component = new GoogleThemeComponent(mockSvg);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initial arc with empty svg', () => {
    expect(component.arc).toEqual('M0,0');
  });

  describe('Arc generate', () => {
    describe('Initialized', () => {
      it('should generate a portion of arc from svg service', () => {
        component.totalTicks = 20;
        component.ticks = 10;

        component.ngOnInit();

        expect(mockSvg.circularArc).toBeCalledWith(0, 0, 49.5, 0, (component.ticks / component.totalTicks) * 2 * Math.PI, false);
      });

      it('should generate a full circle from svg service', () => {
        component.totalTicks = 20;
        component.ticks = 20;

        component.ngOnInit();

        expect(mockSvg.circularArc).toBeCalledWith(0, 0, 49.5, 0, (component.ticks / component.totalTicks) * 2 * Math.PI, false);
      });

      it('should generate a empty arc from svg service', () => {
        component.totalTicks = 20;
        component.ticks = 0;

        component.ngOnInit();

        expect(mockSvg.circularArc).not.toBeCalled();
        expect(component.arc).toEqual('M0,0');
      });

      it('should generate a empty arc when total ticks is zero', () => {
        component.totalTicks = 0;
        component.ticks = 0;

        component.ngOnInit();

        expect(mockSvg.circularArc).not.toBeCalled();
        expect(component.arc).toEqual('M0,0');
      });
    });

    describe('Data changes', () => {
      it('should generate a portion of arc from svg service', () => {
        const changes: SimpleChanges = {
          ticks: new SimpleChange(11, 10, false)
        };

        component.totalTicks = 20;
        component.ticks = 10;

        component.ngOnChanges(changes);

        expect(mockSvg.circularArc).toBeCalledWith(0, 0, 49.5, 0, (component.ticks / component.totalTicks) * 2 * Math.PI, false);
      });

      it('should generate a full circle from svg service', () => {
        const changes: SimpleChanges = {
          ticks: new SimpleChange(11, 10, false)
        };

        component.totalTicks = 20;
        component.ticks = 20;

        component.ngOnChanges(changes);

        expect(mockSvg.circularArc).toBeCalledWith(0, 0, 49.5, 0, (component.ticks / component.totalTicks) * 2 * Math.PI, false);
      });

      it('should generate a empty arc from svg service', () => {
        const changes: SimpleChanges = {
          ticks: new SimpleChange(11, 10, false)
        };

        component.totalTicks = 20;
        component.ticks = 0;

        component.ngOnChanges(changes);

        expect(mockSvg.circularArc).not.toBeCalled();
        expect(component.arc).toEqual('M0,0');
      });

      it('should generate a empty arc when total ticks is zero', () => {
        const changes: SimpleChanges = {
          ticks: new SimpleChange(11, 10, false)
        };

        component.totalTicks = 0;
        component.ticks = 0;

        component.ngOnChanges(changes);

        expect(mockSvg.circularArc).not.toBeCalled();
        expect(component.arc).toEqual('M0,0');
      });
    });

  });
});
