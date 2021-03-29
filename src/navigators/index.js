import Alert from './Alert';
import Drawer from './Drawer';
import Login from './Login';
import Message from './Message';
import MissingPerson from './MissingPerson';
import OnBoarding from './OnBoarding';
import PostCreate from './Post/PostCreate';
import MissingPostEdit from './Post/MissingPostEdit';
import PostDetail from './Post/PostDetail';
import PostDetailForComment from './Post/PostDetailForComment';
import PostEdit from './Post/PostEdit';
import PostNew from './Post/PostNew';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createStructuredSelector } from 'reselect'
import { isAuthenticatedSelector } from 'src/redux/modules/auth';
import AntIcon from "react-native-vector-icons/AntDesign";
import {Colors} from "../styles";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Follow from "./Follow";
import SharePost from "./Post/SharePost";
import Init from "./Init/Init";
import {addIntroSelector} from "../redux/modules/alert";

const Stack = createStackNavigator();

const StackNavigator = ({isAuthenticated, isIntro}) => {

  return (
    <Stack.Navigator>
      {!isIntro && <Stack.Screen
        name="Init"
        component={Init}
        options={{
          headerShown: false
        }}
      />}
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
            name="SharePost"
            component={SharePost}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="MissingPostEdit"
            component={MissingPostEdit}
            options={{
              headerShown: true
            }}
          />
          <Stack.Screen
            name="PostEdit"
            component={PostEdit}
          />
          <Stack.Screen
            name="PostDetail"
            component={PostDetail}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="PostDetailForComment"
            component={PostDetailForComment}
            options={{
              headerTitle: ''
            }}
          />
          <Stack.Screen
            name="MissingPerson"
            component={MissingPerson}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Message"
            component={Message}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Alert"
            component={Alert}
            options={{
              headerShown: true,
              headerBackImage: () => <MCIcon name="format-align-left" size={25} />
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
  isAuthenticated: isAuthenticatedSelector,
  isIntro: addIntroSelector,
})

export default compose(
  connect(selector)
)(StackNavigator);
