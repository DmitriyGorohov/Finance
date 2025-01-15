import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Screens from '../consts/screens.ts';
import AuthScreen from '../../screens/auth/AuthScreen.tsx';

const Stack = createStackNavigator();

const AuthStack = (): React.JSX.Element => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Screens.AUTH} component={AuthScreen} />
    </Stack.Navigator>
);
export default AuthStack;
