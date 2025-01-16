import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import Screens from '../consts/screens.ts';
import EnabledScreen from '../../screens/enabled/EnabledScreen.tsx';

const Stack = createStackNavigator();

const EnabledStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={
                Screens.MAIN_ENABLED_SCREEN
            }
        >
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.MAIN_ENABLED_SCREEN}
                component={EnabledScreen}
            />
        </Stack.Navigator>
    );
};

export default EnabledStack;
