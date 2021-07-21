import { ITheme } from '../interfaces/themes.interface';

const AvailableThemes: ITheme[] = [
    {
        'key': 'digital',
        'label': 'Digital Life'
    },
    {
        'key': 'google',
        'label': 'Google\'s Style'
    },
    {
        'key': 'developer',
        'label': 'Developer Mode'
    },
];
const DefaultTheme = 'digital';

export { AvailableThemes, DefaultTheme }