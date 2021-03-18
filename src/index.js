import React, { useEffect } from 'react';

import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from 'src/navigators';
import { StatusBar } from 'react-native';
import { authSetFcmToken } from 'src/redux/modules/auth';
import { connect } from 'react-redux';
import { fcmService } from 'src/utils/FCMService';
import { localNotificationService } from 'src/utils/LocalNotificationService';
import { navigationRef } from 'src/navigators/Ref';

const Root = ({ authSetFcmToken }) => {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log("[App] onRegister: ", token);
      authSetFcmToken(token);
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify);
      const options = {
        soundName: 'default',
        playSound: true
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      ) 
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify);
      console.log('!!!!!!!!!!open')
    }

    return () => {
      console.log("[App] unRegister from App");
      fcmService.unRegister();
      localNotificationService.unregister();
    }
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <MenuProvider>
        <StatusBar barStyle="dark-content" />
        <StackNavigator />
      </MenuProvider>
    </NavigationContainer>
  )
}

const actions = { authSetFcmToken };

export default connect(null, actions)(Root);
