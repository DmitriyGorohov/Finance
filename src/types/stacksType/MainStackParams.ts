import { type RouteProp } from '@react-navigation/native';
import Screens from '../../navigation/consts/screens.ts';
import { ImageRequireSource } from 'react-native';

export type MainStackParams = {
  [Screens.NEWS]: {
    news: {
      id: string;
      title: string;
      image: ImageRequireSource;
      description: string;
    };
  };
};

export type NewsDetailRouteProps = RouteProp<MainStackParams, Screens.NEWS>;
