import * as RootNavigation from 'src/navigators/Ref';

import { Alert, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  addBadgeCount,
  badgeCountSelector,
  setLocation
} from "./redux/modules/alert";

import Geolocation from '@react-native-community/geolocation';
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
  setLocation 
}) => {
  const [watchID, setWatchID] = useState(null);

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
      addBadgeCount(1);
    }

    return () => {
      console.log("[App] unRegister from App");
      fcmService.unRegister();
      localNotificationService.unregister();
    }
  }, [])

  useEffect(() => {
    if(watchID === null) {
      const wID = Geolocation.watchPosition( position => {
          setLocation({
            data: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude
            }
          });
        },
        err => {
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        },
      );
      
      setWatchID(wID);
    }

    return () => {
      if(watchID !== null) {
        Geolocation.clearWatch(watchID)
      }
    }
  }, [Geolocation, watchID])

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
  setLocation 
};

const selector = createStructuredSelector({
  badges: badgeCountSelector,
});

export default connect(selector, actions)(Root);
