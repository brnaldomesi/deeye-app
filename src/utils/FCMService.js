import { Plastform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
  }

  registerAppWithFCM = async() => {
    if(Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  }

  checkPermission = (onRegister) => {
    messaging().hasPermission()
    .then(enabled => {
      if(enabled) {
        this.getToken(onRegister);
      } else {
        this.requestPermission(onRegister);
      }
    }).catch(error => {
      console.log("[FCMService] Permission rejected", error);
    })
  }

  getToken = (onRegister) => {
    messaging().getToken()
    .then(fcmToken => {
      if(fcmToken) {
        onRegister(fcmToken)
      } else {
        console.log("[FCMService] User does not have a dveice token");
      }
    }).catch(error => {
      console.log("[FCMService] getToken rejected", error);
    })
  }

  requestPermission = (onRegister) => {
    messaging().requestPermission()
    .then(() => {
      this.getToken(onRegister);
    }).catch(error => {
      console.log("[FCMService] Request Permission rejected", error);
    })
  }

  deleteToken = () => {
    console.log("[FCMService] deleteToken");
    messaging().deleteToken()
    .catch(error => {
      console.log("[FCMService] Delete token error ", error);
    })
  }

  createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {

    //When the application is running, but in the background
    messaging()
    .onNotificationOpenedApp(remoteMessage => {
      console.log('[FCMService] onNotificationOpenedApp Notification caused app to open from background state:', remoteMessage);
      if(remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

    // When the application is opend from a quit state.
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log('[FCMService] getInitialNotification Notification caused app to open from quit state:', remoteMessage);
      if(remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    })

    // Foreground state messages
    this.messageListener = messaging().onMessage(async remoteMessage => {
      console.log('[FCMService] A new FCM message arrived!', remoteMessage);
      if(remoteMessage) {
        let notification = null;
        if(Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh(fcmToken => {
      console.log('[FCMService] New token refresh: ', fcmToken);
      onRegister(fcmToken);
    });
  }

  unRegister = () => {
    this.messageListener()
  }
}

export const fcmService = new FCMService();
