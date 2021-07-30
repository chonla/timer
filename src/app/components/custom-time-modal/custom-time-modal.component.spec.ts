import { CustomTimeModalComponent } from './custom-time-modal.component';

describe('CustomTimeModalComponent', () => {
  let component: CustomTimeModalComponent;

  beforeEach(() => {
    component = new CustomTimeModalComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal and emit close event', (done) => {
    component.closed = false;

    component.onClose.subscribe(() => {
      expect(component.closed).toEqual(true)
      done();
    });

    component.closeModal();
  });

  it('should not be able to submit if no selection', () => {
    const result = component.canSubmit();

    expect(result).toEqual(false);
  });

  describe('Ticks calculation', () => {
    it('should calculate ticks correctly when X position in X_:__ timer is changed', (done) => {
      component.onSubmit.subscribe(ticks => {
        expect(ticks).toEqual(600);

        done();
      });

      component.onDigitChange(1, 'mm');
      component.submit();
    });

    it('should calculate ticks correctly when X position in _X:__ timer is changed', (done) => {
      component.onSubmit.subscribe(ticks => {
        expect(ticks).toEqual(60);

        done();
      });

      component.onDigitChange(1, 'm');
      component.submit();
    });

    it('should calculate ticks correctly when X position in __:X_ timer is changed', (done) => {
      component.onSubmit.subscribe(ticks => {
        expect(ticks).toEqual(10);

        done();
      });

      component.onDigitChange(1, 'ss');
      component.submit();
    });

    it('should calculate ticks correctly when X position in __:_X timer is changed', (done) => {
      component.onSubmit.subscribe(ticks => {
        expect(ticks).toEqual(1);

        done();
      });

      component.onDigitChange(1, 's');
      component.submit();
    });
  });

  describe('Submission', () => {
    it('should not submit if it is not submissible', () => {
      jest.spyOn(component.onSubmit, 'emit');

      component.submit();

      expect(component.onSubmit.emit).not.toBeCalled();
    });

    it('should emit the calculated ticks when submit', () => {
      jest.spyOn(component.onSubmit, 'emit');

      component.onDigitChange(1, 's');
      component.submit();

      expect(component.onSubmit.emit).toBeCalledWith(1);
    });

    it('should close modal when submit', () => {
      jest.spyOn(component.onClose, 'emit');

      component.onDigitChange(1, 's');
      component.submit();

      expect(component.closed).toEqual(true);
      expect(component.onClose.emit).toBeCalled();
    });
  });
});
