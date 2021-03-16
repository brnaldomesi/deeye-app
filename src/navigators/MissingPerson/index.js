import CircumstanceInfo from './CircumstanceInfo';
import ContactInfo from './ContactInfo';
import PersonalInfo from './PersonalInfo';
import MissingCategory from './MissingCategory';
import Review from './Review';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  Colors
} from 'src/styles';

const MissingPersonStack = createStackNavigator();

const MissingPerson = ({ navigation }) => {

  return (
    <MissingPersonStack.Navigator>
      <MissingPersonStack.Screen
        name="MissingCategory"
        component={MissingCategory}
        options={{
          title: 'Missing Person Post',
          headerBackImage: () => <AntIcon size={25} name="close" color={Colors.primary} />
        }}
      />
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
      <MissingPersonStack.Screen
        name="Review"
        component={Review}
        options={{
          title: 'Circumstance Information',
        }}
      />
    </MissingPersonStack.Navigator>
  )
};

export default MissingPerson;
