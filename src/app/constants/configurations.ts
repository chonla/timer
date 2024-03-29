import { IAppConfig } from "../interfaces/appconfig.interface";

const configurations: IAppConfig = {
    attentionRequiredAt: 5, // seconds
    defaultDarkMode: false,
    defaultUseSound: true,
    defaultTheme: 'google',
    defaultSound: 'mario_game_over', 
    defaultCustomTimers: [],
    ticksPerSecond: 25,
}

export { configurations }