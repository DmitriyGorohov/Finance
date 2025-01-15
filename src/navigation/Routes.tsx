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
      {isApi ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isOnboarding && (
            <Stack.Screen name={Stacks.AUTH_STACK} component={AuthStack} />
          )}
          <Stack.Screen name={Stacks.TAB} component={TabNavigator} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Stacks.ENABLED} component={EnabledStack} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
