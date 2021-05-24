import * as gStyle from 'src/styles';

import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import Alert from './Alert';
import {BASE_URL} from 'src/config/apipath';
import Init from './Init/Init';
import Login from './Login';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Message from './Message';
import MissingPerson from './MissingPerson';
import MissingPostEdit from './Post/MissingPostEdit';
import OnBoarding from './OnBoarding';
import PostCreate from './Post/PostCreate';
import PostDetail from './Post/PostDetail';
import PostDetailForComment from './Post/PostDetailForComment';
import PostEdit from './Post/PostEdit';
import PostNew from './Post/PostNew';
import PropTypes from 'prop-types';
import Hate from '../components/PopupSheet/Others/Hate';
import SharePost from "./Post/SharePost";
import SplashScreen from "react-native-splash-screen";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createStructuredSelector } from 'reselect'
import { isAuthenticatedSelector } from 'src/redux/modules/auth';
import Send from "./Send";
import {missingAlarm} from "../redux/modules/posts";
import CircumstanceInfo from 'src/navigators/MissingPerson/CircumstanceInfo';
import ContactInfo from 'src/navigators/MissingPerson/ContactInfo';
import Review from 'src/navigators/MissingPerson/Review';
import PersonalInfo from 'src/navigators/MissingPerson/PersonalInfo';
import Home from './Home';
import MissingHome from './MissingHome';
import Profile from './Profile';
import Menu from './Menu';
import Follow from './Follow';
import Setting from './Profile/Setting';

const Stack = createStackNavigator();

const StackNavigator = ({isAuthenticated, missingAlarm}) => {

  const [call, setCall] = useState(false);
  const [initData, setInitData] = useState({});

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const id = 0;

    console.log(missingAlarm);

    missingAlarm({
      id: id, success: (res) => {
        setInitData(res);
        setCall(true);
      },
    });
  }, []);

  if (!call) {
    return <View style={[gStyle.justifyCenter, gStyle.flexOne]}>
      <ActivityIndicator size={'large'} color={'#0000ff'}/>
    </View>;
  } else {
    return <Stack.Navigator>
      {initData.missing_post_content !== undefined && <Stack.Screen
        name="Init"
        component={Init}
        initialParams={{data: initData}}
        options={{
          headerShown: false,
        }}
      />}
      {isAuthenticated ? <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='MissingHome'
            component={MissingHome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Menu'
            component={Menu}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Follow"
            component={Follow}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='PostNew'
            component={PostNew}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PostCreate"
            component={PostCreate}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='SharePost'
            component={SharePost}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Hate"
            component={Hate}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='MissingPostEdit'
            component={MissingPostEdit}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="PostEdit"
            component={PostEdit}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='PostDetail'
            component={PostDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PostDetailForComment"
            component={PostDetailForComment}
            options={{
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name='MissingPerson'
            component={MissingPerson}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Message"
            component={Message}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Alert'
            component={Alert}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name='Profile Setting'
            component={Setting}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Send"
            component={Send}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CircumstanceInfo"
            component={CircumstanceInfo}
          />
          <Stack.Screen
            name="ContactInfo"
            component={ContactInfo}
          />
          <Stack.Screen
            name="Review"
            component={Review}
          />
          <Stack.Screen
            name="PersonalInfo"
            component={PersonalInfo}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </>
        : <>
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </>
      }
    </Stack.Navigator>;
  }
};

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
});

const actions = {
  missingAlarm,
};

export default compose(
  connect(selector, actions),
)(StackNavigator);
