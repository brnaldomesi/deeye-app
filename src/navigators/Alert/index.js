import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import { fcmService } from 'src/utils/FCMService'
import { localNotificationService } from 'src/utils/LocalNotificationService'
import styles from './styles';

const Alert = () => {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log("[App] onRegister: ", token);
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
      alert("Open Notification: " + notify.body);      
    }

    return () => {
      console.log("[App] unRegister");
      fcmService.unRegister();
      localNotificationService.unregister();
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <Text>Sample React Native Firebase</Text>
      <Button
        title="Press me"
        onPress={() => localNotificationService.cancelAllLocalNotifications()}
      />
    </View>
  )  
}

export default Alert;
