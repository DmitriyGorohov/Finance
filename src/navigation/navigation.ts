import type { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';
import Tabs from './consts/tabs.ts';

export type NavigationParams = Record<string, any>;

export interface IRoute {
  name: string;
  params?: NavigationParams;
}

class NavigationC {
  navigationRef = React.createRef<NavigationContainerRef<any>>();

  initialRoute = Tabs.HOME;
  setInitialRoute = (route: any): void => {
    this.initialRoute = route;
  };

  navigate = (routeName: string, params?: NavigationParams): void => {
    setTimeout(
      () => this.navigationRef.current?.navigate(routeName, params),
      0
    );
  };

  canGoBack = (): boolean => this.navigationRef.current?.canGoBack() ?? false;

  replace = (routeName: string, params?: NavigationParams): void => {
    setTimeout(
      () =>
        this.navigationRef.current?.reset({
          index: 0,
          routes: [{ name: routeName, params }],
        }),
      0
    );
  };

  resetToScreen = (routes: IRoute[]): void => {
    this.navigationRef.current?.resetRoot({
      index: 0,
      routes,
    });
  };

  pop = (): void => {
    this.navigationRef.current?.goBack();
  };

  pop2 = (): void => {
    this.pop();
    this.pop();
  };
}

const Navigation = new NavigationC();
export default Navigation;
