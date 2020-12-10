/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';
import React, { useEffect } from 'react';
import { persistor, store } from 'src/redux';

import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import StackNavigator from 'src/navigators';
import { flexOne } from 'src/styles';
import { navigationRef } from 'src/navigators/Ref';
import theme from 'src/styles/theme';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <SafeAreaView style={flexOne}>
            <NavigationContainer ref={navigationRef}>
              <StatusBar barStyle="dark-content" />
              <StackNavigator />
            </NavigationContainer>
          </SafeAreaView>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
