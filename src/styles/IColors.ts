interface IBaseColors {
    [key: string]: string | IBaseColors;
}

export interface IColors extends IBaseColors {
    transparent: string;
    background: string
    backgroundLight: string
    gray: string
    pinkText: string
    green: string
    red: string;


    black: string
    white: string
    redButton: string;
    backgroundBottomTab: string;
    backgroundBottomTabActive: string;
}
