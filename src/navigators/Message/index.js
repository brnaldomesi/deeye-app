import {
  CometChatMessages,
  CometChatUserListWithMessages
} from 'src/react-native-chat-ui-kit';
import React, { useEffect } from 'react';
import { cometChatLogin, cometchatSelector } from 'src/redux/modules/cometchat';

import { COMETCHAT_CONSTANTS } from 'src/config/constants';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createStructuredSelector } from 'reselect';
import { profileSelector } from 'src/redux/modules/auth';

const MessageStack = createStackNavigator();

const Message = ({ cometChatLogin, profile, cometChat }) => {
  const { isLoggedIn, user } = cometChat;

  useEffect(() => {
    if((!isLoggedIn || typeof user.authToken === 'undefined') && profile) {
      cometChatLogin({
        authKey: COMETCHAT_CONSTANTS.AUTH_KEY,
        uid: profile.email.replace(/[^a-zA-Z0-9]/g, "")
      });
    }
  }, [isLoggedIn, profile])

  return (
    <MessageStack.Navigator>
      <MessageStack.Screen
        name="CometChatUserListWithMessages"
        component={CometChatUserListWithMessages}
        options={{
          title: 'Messages',
          headerBackImage: () => <MCIcon name="format-align-left" size={25} />
        }}
      />
      <MessageStack.Screen
        name="CometChatMessages"
        component={CometChatMessages}
        options={{
          headerShown: false
        }}
      />
    </MessageStack.Navigator>
  )
};

const actions = {
  cometChatLogin
}

const selector = createStructuredSelector({
  profile: profileSelector,
  cometChat: cometchatSelector
});

export default compose(
  connect(selector, actions)
)(Message);
