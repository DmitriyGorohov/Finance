import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import { Host } from 'react-native-portalize';
import { persistor, store } from './src/store/store.ts';
import {
  profileActions,
  profileSelector,
} from './src/store/profile/profileSlice.ts';
import { AxiosApi } from './src/api/axiosApi.ts';
import Routes from './src/navigation/Routes.tsx';
import { useActions } from './src/utils/hooks/useActions.ts';

const AppWrapper = () => {
  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const App = () => {
  const actions = useActions(profileActions);
  const { isOnboarding } = useSelector(profileSelector);

  useEffect(() => {
    (async () => {
      if (!isOnboarding) {
        actions.setIsApi(null);
        const api = new AxiosApi('https://clicsushi.store');
        try {
          const data = await api.getTestData();
          actions.setPolicyPath(data.policy);
          if (data.policy.includes('privacypolicies')) {
            console.log('ЕСТЬ');
            actions.setIsApi(true);
          } else {
            console.log('НЕТУ');
            actions.setIsApi(false);
          }
          console.log('Ответ от API:', data);
        } catch (error) {
          console.error('Ошибка:', error);
        }
      }
    })();
  }, [actions, isOnboarding]);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />
      <Host>
        <Routes />
      </Host>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default AppWrapper;
