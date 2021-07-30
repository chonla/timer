import { SimpleChange, SimpleChanges } from '@angular/core';
import { ScrollableDigitComponent } from './scrollable-digit.component';

describe('ScrollableDigitComponent', () => {
  let component: ScrollableDigitComponent;

  beforeEach(() => {
    component = new ScrollableDigitComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Scrolling a digit', () => {
    it('should emit selected digit when digits is scrolled', (done) => {
      const event = ({
        target: {
          scrollTop: 224
        }
      } as unknown) as MouseEvent;
      component.digitsContainer = {
        nativeElement: {
          childNodes: [
            {
              offsetTop: 0,
              innerText: '7'
            },
            {
              offsetTop: 112,
              innerText: '8'
            },
            {
              offsetTop: 224,
              innerText: '9'
            },
          ]
        }
      };
      component.digitOptions = [7, 8, 9];
      component.ngAfterViewInit();

      component.onDigitChange.subscribe((digit) => {
        expect(digit).toEqual(9);
        done();
      });

      component.onDigitScroll(event)
    });

    it('should emit selected digit when digits source has changed and then digits is scrolled', (done) => {
      const changes: SimpleChanges = {
        digitOptions: new SimpleChange([6, 7, 8], [7, 8, 9], false)
      };
      const event = ({
        target: {
          scrollTop: 224
        }
      } as unknown) as MouseEvent;
      component.digitsContainer = {
        nativeElement: {
          childNodes: [
            {
              offsetTop: 0,
              innerText: '7'
            },
            {
              offsetTop: 112,
              innerText: '8'
            },
            {
              offsetTop: 224,
              innerText: '9'
            },
            {
              offsetTop: 336,
              innerText: '10'
            }
          ]
        }
      };
      component.digitOptions = [6, 7, 8];
      component.ngAfterViewInit();
      component.digitOptions = [7, 8, 9, 10];
      component.ngOnChanges(changes);

      component.onDigitChange.subscribe((digit) => {
        expect(digit).toEqual(9);
        done();
      });

      component.onDigitScroll(event)
    });


    it('should not emit any digit when digits is scrolled but not snapped to any digit', () => {
      const event = ({
        target: {
          scrollTop: 14
        }
      } as unknown) as MouseEvent;
      component.digitsContainer = {
        nativeElement: {
          childNodes: [
            {
              offsetTop: 0,
              innerText: '7'
            },
            {
              offsetTop: 112,
              innerText: '8'
            },
            {
              offsetTop: 224,
              innerText: '9'
            },
          ]
        }
      };
      component.digitOptions = [7, 8, 9];
      component.ngAfterViewInit();

      jest.spyOn(component.onDigitChange, 'emit');

      component.onDigitScroll(event);

      expect(component.onDigitChange.emit).not.toBeCalled();
    });

    it('should emit digit change event only once when scroll to the same digit', () => {
      const event = ({
        target: {
          scrollTop: 112
        }
      } as unknown) as MouseEvent;
      component.digitsContainer = {
        nativeElement: {
          childNodes: [
            {
              offsetTop: 0,
              innerText: '7'
            },
            {
              offsetTop: 112,
              innerText: '8'
            },
            {
              offsetTop: 224,
              innerText: '9'
            },
          ]
        }
      };
      component.digitOptions = [7, 8, 9];
      component.ngAfterViewInit();

      jest.spyOn(component.onDigitChange, 'emit');

      component.onDigitScroll(event);
      component.onDigitScroll(event);

      expect(component.onDigitChange.emit).toBeCalledTimes(1);
    });
  });
});
