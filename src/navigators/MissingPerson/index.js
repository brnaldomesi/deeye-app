import CircumstanceInfo from './CircumstanceInfo';
import ContactInfo from './ContactInfo';
import PersonalInfo from './PersonalInfo';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const MissingPersonStack = createStackNavigator();

const MissingPerson = ({ navigation }) => {

  return (
    <MissingPersonStack.Navigator>
      <MissingPersonStack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{
          title: 'Missing Person',
        }}
      />
      <MissingPersonStack.Screen
        name="CircumstanceInfo"
        component={CircumstanceInfo}
        options={{
          title: 'Personal Information',
        }}
      />
      <MissingPersonStack.Screen
        name="ContactInfo"
        component={ContactInfo}
        options={{
          title: 'Circumstance Information',
        }}
      />
    </MissingPersonStack.Navigator>
  )
};

export default MissingPerson;
