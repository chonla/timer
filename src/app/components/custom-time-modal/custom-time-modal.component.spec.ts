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
});
