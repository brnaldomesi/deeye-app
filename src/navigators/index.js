import Home from './Home';
import Login from './Login';
import OnBoarding from './OnBoarding';
import Post from './Post';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Login" 
      component={Login}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="OnBoarding"
      component={OnBoarding}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="Post"
      component={Post}
    />
  </Stack.Navigator>
);

export default StackNavigator;
