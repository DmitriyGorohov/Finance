import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Host } from 'react-native-portalize';
import { persistor, store } from './src/store/store.ts';

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
  // const dispatch = useDispatch<AppDispatch>();
  // const { isOnboarding } = useSelector(profileSelector);
  //
  // useEffect(() => {
  //   (async () => {
  //     if (!isOnboarding) {
  //       dispatch(setIsApi(null));
  //       const api = new AxiosApi('https://clicsushi.store');
  //       try {
  //         const data = await api.getTestData();
  //         dispatch(setPolicyPath(data.policy));
  //         if (data.policy.includes('privacypolicies')) {
  //           console.log('ЕСТЬ');
  //           dispatch(setIsApi(true));
  //         } else {
  //           console.log('НЕТУ');
  //           dispatch(setIsApi(false));
  //         }
  //         console.log('Ответ от API:', data);
  //       } catch (error) {
  //         console.error('Ошибка:', error);
  //       }
  //     }
  //   })();
  // }, [dispatch, isOnboarding]);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />
      <Host>
        {/*<Navigator />*/}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}
        >
          <Text>ASD</Text>
        </View>
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
