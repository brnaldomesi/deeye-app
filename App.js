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
  SafeAreaView
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
import RNLocation from 'react-native-location';

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
    // setInterval(() => {
    //   RNLocation.configure({
    //     distanceFilter: 5.0
    //   });
    //
    //   RNLocation.requestPermission({
    //     ios: "whenInUse",
    //     android: {
    //       detail: "coarse"
    //     }
    //   }).then(granted => {
    //     if (granted) {
    //       // console.log('heyhey')
    //       RNLocation.subscribeToLocationUpdates(locations => {
    //         console.log(locations)
    //         /* Example location returned
    //         {
    //           speed: -1,
    //           longitude: -0.1337,
    //           latitude: 51.50998,
    //           accuracy: 5,
    //           heading: -1,
    //           altitude: 0,
    //           altitudeAccuracy: -1
    //           floor: 0
    //           timestamp: 1446007304457.029,
    //           fromMockProvider: false
    //         }
    //         */
    //       })
    //     }
    //   })
    // }, 2000);

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
            <Root />
          </SafeAreaView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
