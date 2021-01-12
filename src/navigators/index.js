import Drawer from './Drawer';
import Login from './Login';
import MissingPerson from './MissingPerson';
import OnBoarding from './OnBoarding';
import PostCreate from './Post/PostCreate';
import PostEdit from './Post/PostEdit';
import PostNew from './Post/PostNew';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createStructuredSelector } from 'reselect'
import { isAuthenticatedSelector } from 'src/redux/modules/auth';

const Stack = createStackNavigator();

const StackNavigator = ({isAuthenticated}) => { 
  return (
    <Stack.Navigator>
      {isAuthenticated ? <> 
          <Stack.Screen
            name="Drawer"
            component={Drawer}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="PostNew"
            component={PostNew}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="PostCreate"
            component={PostCreate}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="PostEdit"
            component={PostEdit}
          />
          <Stack.Screen
            name="MissingPerson"
            component={MissingPerson}
            options={{
              headerShown: false
            }}
          />
        </>
        : <>
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="Login" 
            component={Login}
            options={{
              headerShown: false
            }}
          />
        </>
      }
    </Stack.Navigator>
  );
};

StackNavigator.propTypes = {
  isAuthenticated: PropTypes.bool
}

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

export default compose(
  connect(selector)
)(StackNavigator);
