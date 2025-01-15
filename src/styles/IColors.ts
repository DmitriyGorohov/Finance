interface IBaseColors {
    [key: string]: string | IBaseColors;
}

export interface IColors extends IBaseColors {
    black: string
    white: string
    redButton: string;
    backgroundBottomTab: string;
    backgroundBottomTabActive: string;
}
