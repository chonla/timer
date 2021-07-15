import { PresetButtonComponent } from './preset-button.component';

describe('PresetButtonComponent', () => {
  let component: PresetButtonComponent;

  beforeEach(() => {
    component = new PresetButtonComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when clicked', (done) => {
    component.onClicked.subscribe(() => {
      done();
    });

    component.clicked();
  });
});
