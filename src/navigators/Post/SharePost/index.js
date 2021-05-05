import React, {useEffect, useState} from 'react';
import {View, TextInput, ScrollView} from 'react-native'
import * as RootNavigation from "../../Ref";
import Header from "../components/Header";
import {Avatar, ListItem} from "react-native-elements";
import {ASSET_BASE_URL} from "../../../config/apipath";
import * as gStyle from 'src/styles';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feed from "../../../components/Feeds/Feed";
import {likePost, savePost, sharePost} from "../../../redux/modules/posts";
import {compose} from "redux";
import {connect} from "react-redux";
import {Size} from "../../../styles";


const SharePost = ({route, sharePost}) => {

  const post = route.params.post;
  const [initState, setInitState] = useState(false);
  const [avatarPath, setAvatarPath] = useState(null);
  const [avatarName, setAvatarName] = useState('');
  const [avatarId, setAvatarId] = useState(0);
  const [detail, setDetail] = useState('');

  AsyncStorage.getItem('profile').then(profile => {
    setAvatarPath(ASSET_BASE_URL + JSON.parse(profile).avatar_path);
    setAvatarName(JSON.parse(profile).first_name)
    setAvatarId(JSON.parse(profile).id)
  });

  const handleClose = () => {
    RootNavigation.navigate('Home');
  };

  const handlePost = () => {
    sharePost({id: post.id, data: { description: detail}, success: () => {RootNavigation.navigate('Home')}});
  };

  const handleChange = (object) => {
    setDetail(object);
  };

  return (
    <View style={[gStyle.bgWhite, gStyle.flexOne]}>
      <Header
        handleClose={handleClose}
        handlePost={handlePost}
        title="Share Post"
        rightButton
        buttonPrimary={!initState}
      />
      <View>
        <ListItem>
          <Avatar rounded source={{uri: avatarPath}}></Avatar>
          <ListItem.Content>
            <ListItem.Title>{avatarName}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <View style={{marginStart: Size(1), marginEnd: Size(1)}}>
          <TextInput
            multiline={true}
            value={detail}
            onChangeText={handleChange}
            placeholder={'What do you want to share about this post?'}
          />
        </View>
      </View>
      <ScrollView>
        <Feed post={post} profileId={avatarId} isShare={false} />
      </ScrollView>
    </View>
  )

};


const actions = {
  sharePost
}

export default compose(
  connect(null, actions)
)(SharePost);