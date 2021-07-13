import { ControllerComponent } from './controller.component';

describe('ControllerComponent', () => {
  let component: ControllerComponent;

  beforeEach(() => {
    component = new ControllerComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should turn off sound when toggle sound with false', () =>{ 
    component.soundToggled(false);
    
    expect(component.useSound).toBe(false);
  });

  it('should turn on sound when toggle sound with true', () =>{ 
    component.soundToggled(true);
    
    expect(component.useSound).toBe(true);
  });

  it('should turn on sound by default', () =>{ 
    expect(component.useSound).toBe(true);
  });
});
