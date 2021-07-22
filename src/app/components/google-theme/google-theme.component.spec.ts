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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
