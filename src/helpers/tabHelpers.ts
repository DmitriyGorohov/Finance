import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Colors from '../styles/Colors.ts';

export const tabBarOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: Colors.white,
  tabBarInactiveTintColor: Colors.white,
  tabBarLabelStyle: {
    display: 'none',
  },
  tabBarStyle: [
    {
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: Colors.transparent,
      backgroundColor: Colors.transparent,
    },
  ],
};
