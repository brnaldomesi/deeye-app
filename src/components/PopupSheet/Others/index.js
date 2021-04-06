import * as RootNavigation from 'src/navigators/Ref';

import {
  ListItem,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import React, {useCallback, useState, useRef} from 'react';
import {
  hidePost,
  reportPost,
} from 'src/redux/modules/posts';

import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';


const Others = ({
  post,
  hidePost,
  reportPost,
  onMenuItemPress
}) => {

  const handleHate = () => {
    onMenuItemPress("hate");
  }

  const handleReport = () => {
    onMenuItemPress("report");
  }

  const handleSave = () => {
    onMenuItemPress("save");
  }

  const handleShare = () => {
    onMenuItemPress("share");
  }

  const handleDownload = () => {
    onMenuItemPress("down")
  }

  const handleFollow = () => {
    onMenuItemPress("follow");
  }

  const list_others = [
    { title: 'Save', content: 'Save this post for later reference', icon:'bookmark', onPress: handleSave },
    { title: 'Share', content: 'Can share it on the app or via other platforms', icon:'share-2', onPress: handleShare },
    { title: 'Download Poster', content: 'Download a free design poster for your missing person post', icon:'download-cloud', onPress: handleDownload },
    { title: 'Follow John Smith', content: '', icon:'user-plus', onPress: handleFollow },
    { title: 'I do not want to see this', content: 'Let us know why you do not want to see this post', icon:'eye-off', onPress: handleHate },
    { title: 'Report this post', content: 'This post is offensive or not right', icon:'flag', onPress: handleReport },
];

  return (
    <>
    {list_others.map((item, index) => (
      <ListItem style={styles.list} key={index} bottomDivider onPress={() => item.onPress()} onMenuItemPress={()=>item.onCallback()}>
        <Icon style={styles.icon} name={item.icon}/>
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
          <ListItem.Subtitle style={styles.content}>{item.content}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))}
    </>
  )
}

const actions = {
  hidePost,
  reportPost
}

export default compose(
  connect(null, actions)
)(Others);