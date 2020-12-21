import Home from './Home';
import Login from './Login';
import OnBoarding from './OnBoarding';
import Post from './Post';
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
          <Stack.Screen
            name="PostNew"
            component={PostNew}
            options={{
              headerShown: false
            }}
          />
        </>
        : <Stack.Screen 
          name="Login" 
          component={Login}
          options={{
            headerShown: false
          }}
        />
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
