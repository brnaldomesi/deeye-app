import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from 'react-native';
import React, { useCallback, useState } from 'react';

import { CometChatManager } from 'src/react-native-chat-ui-kit/src/utils/controller';
import { Divider } from 'react-native-elements';
import { UserListManager } from 'src/react-native-chat-ui-kit/src/components/Users/CometChatUserList/controller';
import { cometchatSelector } from 'src/redux/modules/cometchat';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const CometChatUserList = ({ cometChat }) => {
  const { loading, error, isLoggedIn } = cometChat;

  let userListManager = null;
  const friendsOnly = false;

  const [userlist, setUserlist] = useState([]);
  const [decoratorMessage, setDecoratorMessage] = useState('Loading...');
  
  
  useFocusEffect(useCallback(
    () => {
      setDecoratorMessage('Loading...');
      if(userListManager) {
        userListManager.removeListeners();
      }
      setUserlist([]);
      userListManager = new UserListManager(friendsOnly);
      if(isLoggedIn) {
        getUsers();
      }
      userListManager.attachListeners(userUpdated);

      return () => {
        userListManager.removeListeners();
        userListManager = null;
      }
    },
    [isLoggedIn],
  ));

  const userUpdated = user => {
    const ulist = userlist;

    // search for user
    const userKey = ulist.findIndex((u) => u.uid === user.uid);

    // if found in the list, update user object
    if (userKey > -1) {
      const userObj = { ...ulist[userKey] };
      const newUserObj = { ...userObj, ...user };
      ulist.splice(userKey, 1, newUserObj);

      setUserlist(ulist);
    } 
  };

  const endReached = () => getUsers();

  const getUsers = () => {
    new CometChatManager()
      .getLoggedInUser()
      .then(() => {
        if(userListManager) {
          userListManager.fetchNextUsers()
            .then((res) => {
              if (res.length === 0) {
                setDecoratorMessage('No users found');
              }
              setUserlist(userlist => [userlist, ...res]);
            })
            .catch(error => {
              setDecoratorMessage('Error');
              console.error('[CometChatUserList] getUsers fetchNext error', error);
            });
        }
      })
      .catch(error => {
        setDecoratorMessage('Error');
        console.log('[CometChatUserList] getUsers getLoggedInUser error', error);
      });
  };

  const renderUserView = ({ item, index }) => {
    return (
      <View key={index}><Text>123</Text></View>
    );
  };

  const listEmptyContainer = () => {
    return (
      <View>
        <Text>{decoratorMessage}</Text>
      </View>
    );
  };

  return (
    <>
      {loading ? <ActivityIndicator size="large" color="red" /> : (
        error ? <Text>{error.message}</Text> : ( isLoggedIn &&
          <FlatList
            data={userlist}
            renderItem={renderUserView}
            ListEmptyComponent={listEmptyContainer}
            ItemSeparatorComponent={() => <Divider />}
            onEndReached={endReached}
            onEndReachedThreshold={0.3}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        )  
      )}
    </>
  )
};

const selector = createStructuredSelector({
  cometChat: cometchatSelector
});

export default compose(
  connect(selector, null)
)(CometChatUserList);
