import * as gStyle from 'src/styles'

import {ActivityIndicator, View} from "react-native";
import React, { useEffect, useState } from 'react';

import Alert from './Alert';
import {BASE_URL} from "src/config/apipath";
import Drawer from './Drawer';
import Init from "./Init/Init";
import Login from './Login';
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
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
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createStructuredSelector } from 'reselect'
import { isAuthenticatedSelector } from 'src/redux/modules/auth';
import {refineJSON} from "src/utils/helpers";

const Stack = createStackNavigator();

const StackNavigator = ({isAuthenticated}) => {

  const [call, setCall] = useState(false);
  const [initData, setInitData] = useState({});

  useEffect(() => {
    SplashScreen.hide();

    const id = 0;

    axios({
      url: BASE_URL + '/missing/user_id=' + id,
      method: 'get',
    })
      .then(function (data) {
        const item = refineJSON(data.data);
        setInitData(item);
        setCall(true);

      }).catch((error) => {
      console.log('error')
    });

  }, []);

  if (!call) {
    return <View style={[gStyle.justifyCenter, gStyle.flexOne]}>
      <ActivityIndicator size={"large"} color={'#0000ff'}/>
    </View>
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
            name="Hate"
            component={Hate}
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
            options={{
              headerShown: false
            }}
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
              headerBackImage: () => <MCIcon name="format-align-left" size={25}/>
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
  }
};

StackNavigator.propTypes = {
  isAuthenticated: PropTypes.bool
}

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
})

export default compose(
  connect(selector)
)(StackNavigator);
