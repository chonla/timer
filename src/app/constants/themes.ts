import { ITheme } from '../interfaces/themes.interface';

const AvailableThemes: ITheme[] = [
    {
        'key': 'developer',
        'label': 'Developer Mode'
    },
];
const DefaultTheme = 'developer';

export { AvailableThemes, DefaultTheme }