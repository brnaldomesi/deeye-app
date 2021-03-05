/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  ActivityIndicator,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar
} from 'react-native';
import React, { useEffect } from 'react';
import { persistor, store } from 'src/redux';

import { COMETCHAT_CONSTANTS } from 'src/config/constants';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import StackNavigator from 'src/navigators';
import { ThemeProvider } from 'react-native-elements';
import { flexOne } from 'src/styles';
import { navigationRef } from 'src/navigators/Ref';
import theme from 'src/styles/theme';

const getPermissions = async () => {
  if (Platform.OS === 'android') {
    let granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
    }
  }
};

const App: () => React$Node = () => {
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .build();

  useEffect(() => {
    SplashScreen.hide();
    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now call login function.
      },
      error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
    getPermissions();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={flexOne}>
            <NavigationContainer ref={navigationRef}>
              <MenuProvider>
                <StatusBar barStyle="dark-content" />
                <StackNavigator />
              </MenuProvider>
            </NavigationContainer>
          </SafeAreaView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
