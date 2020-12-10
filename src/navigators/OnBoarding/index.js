import { Size, fontWeightBold, primaryColor } from 'src/styles';
import { Text, TouchableOpacity } from 'react-native'

import ExtendSearch from './ExtendSearch';
import Global from './Global';
import Proximity from './Proximity';
import React from 'react';
import RealTime from './RealTime';
import { createStackNavigator } from '@react-navigation/stack';

const OnBoardingStack = createStackNavigator();

const OnBoarding = ({ navigation }) => {

  return (
    <OnBoardingStack.Navigator 
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
        headerRightContainerStyle: {
          paddingRight: Size(1.5),
        },
        headerLeftContainerStyle: {
          paddingLeft: Size(1.5),
        }
      }}
    >
      <OnBoardingStack.Screen
        name="Global"
        component={Global}
        options={{
          headerRight: props => (
            <TouchableOpacity 
              {...props} 
              onPress={() => navigation.navigate('RealTime')}
            >
              <Text style={[fontWeightBold, primaryColor]}>SKIP</Text>
            </TouchableOpacity>
          )
        }}
      />
      <OnBoardingStack.Screen
        name="RealTime"
        component={RealTime}
        options={{
          headerLeft: props => (
            <TouchableOpacity 
              {...props} 
              onPress={() => navigation.navigate('Global')}
            >
              <Text style={[fontWeightBold, primaryColor]}>BACK</Text>
            </TouchableOpacity>
          ),
          headerRight: props => (
            <TouchableOpacity 
              {...props} 
              onPress={() => navigation.navigate('Proximity')}
            >
              <Text style={[fontWeightBold, primaryColor]}>SKIP</Text>
            </TouchableOpacity>
          )
        }}
      />
      <OnBoardingStack.Screen
        name="Proximity"
        component={Proximity}
        options={{
          headerLeft: props => (
            <TouchableOpacity 
              {...props} 
              onPress={() => navigation.navigate('RealTime')}
            >
              <Text style={[fontWeightBold, primaryColor]}>BACK</Text>
            </TouchableOpacity>
          ),
          headerRight: props => (
            <TouchableOpacity 
              {...props} 
              onPress={() => navigation.navigate('ExtendSearch')}
            >
              <Text style={[fontWeightBold, primaryColor]}>SKIP</Text>
            </TouchableOpacity>
          )
        }}
      />
      <OnBoardingStack.Screen
        name="ExtendSearch"
        component={ExtendSearch}
        options={{
          headerLeft: props => (
            <TouchableOpacity 
              {...props} 
              onPress={() => navigation.navigate('Proximity')}
            >
              <Text style={[fontWeightBold, primaryColor]}>BACK</Text>
            </TouchableOpacity>
          )
        }}
      />
    </OnBoardingStack.Navigator>
  )
}

export default OnBoarding;
