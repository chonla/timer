interface IAppConfig {
    // When tick reaches this value, attentionRequired flag will be turned on.
    attentionRequiredAt: number
    // Default selected theme
    defaultTheme: string
    // Default selected sound
    defaultSound: string
    // Default value for useSound flag
    defaultUseSound: boolean
    // Default value for darmMode flag
    defaultDarkMode: boolean
    
    defaultCustomTimers: number[]
}

export { IAppConfig }