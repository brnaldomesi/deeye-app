import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Email from './Email';
import First from './First';
import Footer from 'src/components/Footer';
import Home from 'src/navigators/Home'
import LoginHeader from 'src/components/LoginHeader';
import OtpCode from './OtpCode';
import Password from './Password';
import Phone from './Phone';
import React from 'react'
import { Size } from 'src/styles';
import { createStackNavigator } from '@react-navigation/stack';

const LoginStack = createStackNavigator();

const Login = () => {

  return (
    <>
      <View style={{
          flex:2,
          alignItems: 'center'
        }}
      >
        <Text>Temp Content</Text>
      </View>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={1}
      />
      <View style={{ flex:3 }}>
        <LoginStack.Navigator screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            height: Size(4)
          },
          headerBackground: () => (<LoginHeader />),
          cardStyle: { backgroundColor: 'white' },
        }}>
          <LoginStack.Screen
            name="First"
            component={First}
            options={{
              title: 'Sign In / Sign Up',
              headerLeft: null,
            }}
          />
          <LoginStack.Screen
            name="Email"
            component={Email}
            options={{
              title: 'Email Address',
            }}
          />
          <LoginStack.Screen
            name="Phone"
            component={Phone}
            options={{
              title: 'Phone Number',
            }}
          />
          <LoginStack.Screen
            name="OtpCode"
            component={OtpCode}
            options={{
              title: 'OTP CODE',
            }}
          />
          <LoginStack.Screen
            name="Password"
            component={Password}
            options={{
              title: 'Password',
            }}
          />
        </LoginStack.Navigator>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  }
});

export default Login
