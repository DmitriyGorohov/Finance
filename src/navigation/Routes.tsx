import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation.ts';
import Colors from '../styles/Colors.ts';
import { createStackNavigator } from '@react-navigation/stack';
import Stacks from './consts/stacks.ts';
import { useSelector } from 'react-redux';
import { profileSelector } from '../store/profile/profileSlice.ts';
import { AuthStack } from './stacks';
import EnabledStack from './stacks/EnabledStack.tsx';
import TabNavigator from './tab/TabNavigator.tsx';
import Screens from './consts/screens.ts';
import IncomeScreen from '../screens/home/IncomeScreen.tsx';
import ExpenseScreen from '../screens/home/ExpenseScreen.tsx';
import NewsDetailScreen from '../screens/news/NewsDetailScreen.tsx';

const Stack = createStackNavigator();

const Routes = () => {
  const { isOnboarding, isApi } = useSelector(profileSelector);

  return (
    <NavigationContainer
      ref={Navigation.navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: Colors.black,
        },
      }}
    >
      {isApi && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isOnboarding && (
            <Stack.Screen name={Stacks.AUTH_STACK} component={AuthStack} />
          )}
          <Stack.Group>
            <Stack.Screen name={Stacks.TAB} component={TabNavigator} />
            <Stack.Screen name={Screens.INCOME} component={IncomeScreen} />
            <Stack.Screen name={Screens.EXPAND} component={ExpenseScreen} />
            <Stack.Screen name={Screens.NEWS} component={NewsDetailScreen} />
          </Stack.Group>
        </Stack.Navigator>
        )}
      {!isApi && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Stacks.ENABLED} component={EnabledStack} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
