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
  Alert,
  BackHandler
} from 'react-native';
import React, { useEffect } from 'react';
import { persistor, store } from 'src/redux';

import { COMETCHAT_CONSTANTS } from 'src/config/constants';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import Root from  'src';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from 'react-native-elements';
import { flexOne } from 'src/styles';
import theme from 'src/styles/theme';

const getPermissions = async () => {
  if (Platform.OS === 'android') {
    let granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
    navigator.geolocation = require('@react-native-community/geolocation');
  }, [])

  useEffect(() => {
    // const backAction = () => {
    //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel"
    //     },
    //     { text: "YES", onPress: () => BackHandler.exitApp() }
    //   ]);
    //   return true;
    // };
    //
    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );
    //
    // return () => backHandler.remove();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={flexOne}>
            <Root />
          </SafeAreaView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
