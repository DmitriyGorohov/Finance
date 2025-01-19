import { type RouteProp } from '@react-navigation/native';
import Screens from '../../navigation/consts/screens.ts';

export type MainStackParams = {
  [Screens.NEWS]: {
    news: {
      id: string;
      title: string;
      image: string;
      description: string;
    };
  };
};

export type NewsDetailRouteProps = RouteProp<MainStackParams, Screens.NEWS>;
