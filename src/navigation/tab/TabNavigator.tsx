import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navigation from '../navigation.ts';
import Tabs from '../consts/tabs.ts';
import HomeScreen from '../../screens/home/HomeScreen.tsx';
import HistoryScreen from '../../screens/history/HistoryScreen.tsx';
import AuthScreen from '../../screens/auth/AuthScreen.tsx';
import { tabBarOptions } from '../../helpers/tabHelpers.ts';
import { Image, View } from 'react-native';
import { isIOS } from '../../helpers/platformHelpers.ts';
import Colors from '../../styles/Colors.ts';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={Navigation.initialRoute}
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarOptions.tabBarStyle,
      }}
    >
      <Tab.Screen
        name={Tabs.HOME}
        component={HomeScreen}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  marginTop: isIOS ? 20 : 0,
                  width: 100,
                  height: 50,
                  backgroundColor: focused
                    ? Colors.background
                    : Colors.backgroundLight,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../assets/img/haus-icon/house-2.png')}
                  resizeMode={'cover'}
                />
              </View>
            );
          },
          ...tabBarOptions,
          tabBarStyle: [tabBarOptions.tabBarStyle],
        })}
      />
      <Tab.Screen
        name={Tabs.SETTINGS}
        component={AuthScreen}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  marginTop: isIOS ? 20 : 0,
                  width: 100,
                  height: 50,
                  backgroundColor: focused
                    ? Colors.background
                    : Colors.backgroundLight,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../assets/img/setting-icon/setting-4.png')}
                  resizeMode={'cover'}
                />
              </View>
            );
          },
          ...tabBarOptions,
          tabBarStyle: [tabBarOptions.tabBarStyle],
        })}
      />
      <Tab.Screen
        name={Tabs.HISTORY}
        component={HistoryScreen}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  marginTop: isIOS ? 20 : 0,
                  width: 100,
                  height: 50,
                  backgroundColor: focused
                    ? Colors.background
                    : Colors.backgroundLight,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../assets/img/setting-icon/setting-4.png')}
                  resizeMode={'cover'}
                />
              </View>
            );
          },
          ...tabBarOptions,
          tabBarStyle: [tabBarOptions.tabBarStyle],
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
