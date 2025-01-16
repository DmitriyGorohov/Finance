import Navigation, { NavigationParams } from '../navigation/navigation.ts';

export const navigateToScreen = (screen: string, params?: NavigationParams) => {
  Navigation.navigate(screen, params);
};

export const navigateToBack = () => {
  Navigation.pop();
};
