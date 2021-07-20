import { ITheme } from '../interfaces/themes.interface';

const AvailableThemes: ITheme[] = [
    {
        'key': 'digital',
        'label': 'Digital Life'
    },
    {
        'key': 'developer',
        'label': 'Developer Mode'
    },
];
const DefaultTheme = 'developer';

export { AvailableThemes, DefaultTheme }