import { SwitchComponent } from "./switch.component";

describe('SwitchComponent', () => {
  let component: SwitchComponent;

  beforeEach(() => {
    component = new SwitchComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true when selection changes to true', (done) => {
    const target = ({
      checked: true
    } as unknown) as HTMLInputElement;
    const event = ({
      target: target
    } as unknown) as Event;

    component.onChange.subscribe((e: Event) => {
      expect(e).toEqual(true);
      done();
    });

    component.change(event);
  });

  it('should emit false when selection changes to false', (done) => {
    const target = ({
      checked: false
    } as unknown) as HTMLInputElement;
    const event = ({
      target: target
    } as unknown) as Event;

    component.onChange.subscribe((e: Event) => {
      expect(e).toEqual(false);
      done();
    });

    component.change(event);
  });
});
