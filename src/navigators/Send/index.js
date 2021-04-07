import React, {useState, useMemo, useEffect} from 'react';
import {View, useWindowDimensions, TouchableOpacity, Text, Image, TextInput, ScrollView} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import * as gStyle from "src/styles/styles";
import {COMETCHAT_CONSTANTS, IMAGES_PATH} from "../../config/constants";
import styles from './styles'
import {Size} from "../../styles";
import {Avatar, ListItem} from "react-native-elements";
import {ASSET_BASE_URL} from "../../config/apipath";
import {cometChatLogin, cometchatSelector} from "src/redux/modules/cometchat";
import {createStructuredSelector} from "reselect";
import {profileSelector} from "src/redux/modules/auth";
import {compose} from "redux";
import {connect} from "react-redux";
import {CometChat} from "@cometchat-pro/react-native-chat";
import {followListSelector, getFollowList} from "../../redux/modules/follow";

const Send = ({route, profile, cometChat, navigation, getFollowList, follows }) => {
  const { isLoggedIn, user } = cometChat;
  const { post } = route.params;

  //list
  const [chat, setChat] = useState([]);

  //search
  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState('');

  //viewpager
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Recent Chats'},
    {key: 'second', title: 'Followers list'},
  ]);

  const layout = useWindowDimensions();

  useEffect(() => {
    if((!isLoggedIn || typeof user.authToken === 'undefined')&& profile) {
      CometChat.login('user' + profile.user_id, COMETCHAT_CONSTANTS.AUTH_KEY)
        .then(() => {
          getRecentUser()
        }).error(() => {
          console.log('error')
        }
      );
    } else {
      getRecentUser()
    }
  }, [isLoggedIn, profile])

  const getRecentUser = () => {
    const conversationsRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(50)
      .build();

    conversationsRequest.fetchNext().then(
      conversationList => {
        setChat(conversationList);
      },
      error => {
        console.log("Conversations list fetching failed with error:", error);
      }
    );
  };

  useMemo(() => {
    if (index === 1) {
      getFollowList({params: {type: 0, search: searchText}});
    }
  }, [searchText, index]);

  const renderScene = SceneMap({
    first: () =>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        {chat.map((item, key) => {
          let temp = user.name === item.lastMessage.receiverId ? item.lastMessage.sender : item.lastMessage.receiver;
          // console.log('sdfsdfsdf', item.lastMessage)
          // console.log('asddd', user)
          // console.log('temp', temp)
          return <ListItem key={key} bottomDivider>
            <Avatar rounded/>
            <ListItem.Content>
              <ListItem.Title>{temp.name}</ListItem.Title>
              <ListItem.Subtitle>{temp.status}</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity onPress={handleSend(temp.uid)}>
              <Text style={styles.itemSend}>Send</Text>
            </TouchableOpacity>
          </ListItem>
        })}
      </ScrollView>
    ,
    second: () =>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        {follows && follows.map((item, key) => {
          return <ListItem key={key} bottomDivider>
            <Avatar
              rounded
              source={{uri: ASSET_BASE_URL + item.avatar_path}}/>
            <ListItem.Content>
              <ListItem.Title>{item.first_name}</ListItem.Title>
              <ListItem.Subtitle>{item.last_name}</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity onPress={handleSend((item.first_name + item.last_name).toLowerCase())}>
              <Text style={styles.itemSend}>Send</Text>
            </TouchableOpacity>
          </ListItem>
        })}
      </ScrollView>
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChange = (object) => {
    setSearchText(object);
    setIsEdit(object !== '')
  };

  const handleCancel = () => {
    setSearchText('');
    setIsEdit(false);
  };

  const handleSend = (uid) => () => {
    let receiverID = uid;
    let customData = {
      data: post
    };

    let customType = "data";
    let receiverType = CometChat.RECEIVER_TYPE.USER;

    let customMessage = new CometChat.CustomMessage(
      receiverID,
      receiverType,
      customType,
      customData
    );

    CometChat.sendCustomMessage(customMessage).then(
      message => {
        // Message sent successfully.
        console.log("custom message sent successfully", message);

        navigation.goBack();
      },
      error => {
        console.log("custom message sending failed with error", error);
        // Handle exception.
      }
    );
  };

  return (
    <>
      <View style={[gStyle.d_flex, {height: Size(4), backgroundColor: 'white'}]}>
        <TouchableOpacity style={{marginStart: 10, marginTop: 'auto', marginBottom: 'auto'}} onPress={handleBack}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <View style={[styles.m_auto, styles.searchBarParent]}>
          <Image style={styles.searchBtn} source={IMAGES_PATH.search}/>
          <TextInput
            placeholder={'Search'}
            style={styles.searchBarInput}
            onChangeText={handleChange}
            multiline={false}
            value={searchText}
            onSubmitEditing={() => {
            }}
          />
          {isEdit && <TouchableOpacity onPress={handleCancel} style={{marginLeft: 'auto'}}>
            <Image style={styles.closeBtn} source={IMAGES_PATH.cancel}/>
          </TouchableOpacity>}
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props =>
          <TabBar
            {...props}
            activeColor={'#05174f'}
            inactiveColor={'gray'}
            style={{backgroundColor: '#eeeeee'}}
            indicatorStyle={{backgroundColor: '#05174f'}}
            tabStyle={{}}
          />
        }
      />
    </>
  );
};

const actions = {
  cometChatLogin,
  getFollowList,
}

const selector = createStructuredSelector({
  profile: profileSelector,
  cometChat: cometchatSelector,
  follows: followListSelector,
});

export default compose(
  connect(selector, actions)
)(Send);
