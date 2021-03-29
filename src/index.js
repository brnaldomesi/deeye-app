import * as RootNavigation from 'src/navigators/Ref';

import { Alert, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  addBadgeCount, addIntro,
  badgeCountSelector,
  setLocation,
  addBadgeCount,
} from "./redux/modules/alert";

import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import PropTypes from "prop-types";
import StackNavigator from 'src/navigators';
import { authSetFcmToken } from 'src/redux/modules/auth';
import { badgeSelectors } from "./redux";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { fcmService } from 'src/utils/FCMService';
import { localNotificationService } from 'src/utils/LocalNotificationService';
import { navigationRef } from 'src/navigators/Ref';

const Root = ({ 
  authSetFcmToken, 
  addBadgeCount,
  badges, 
  setLocation,
  addIntro,
}) => {
  useEffect(() => {
    addIntro(false);

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
      addBadgeCount(1);
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

Root.propTypes = {
  addBadgeCount: PropTypes.func,
  badges: PropTypes.number,
};

const actions = { 
  authSetFcmToken, 
  addBadgeCount,
  setLocation,
  addIntro,
};

const selector = createStructuredSelector({
  badges: badgeCountSelector,
});

export default connect(selector, actions)(Root);
