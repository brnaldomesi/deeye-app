import * as RootNavigation from 'src/navigators/Ref';

import {
  Alert,
  Image,
  View
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import React, {useCallback, useState} from 'react';
import {
  Size,
  itemsCenter,
  resizeCover
} from 'src/styles';
import {
  deletePost,
  hidePost,
  reportPost
} from 'src/redux/modules/posts';

import { IMAGES_PATH } from 'src/config/constants';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { navigationRef } from 'src/navigators/Ref';
import styles from './styles';

const PopupMenu = ({
  post,
  isMyPost,
  hidePost,
  deletePost,
  getUserPostsList,
  reportPost
}) => {

  const handleEdit = () => {
    RootNavigation.navigate(post.post_type === 'MissingPerson' ? 'MissingPostEdit' : 'PostEdit', {post});
  }

  const handleHide = () => {
    hidePost({id: post.id})
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure to delete?',
      [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          onPress: () => {
            deletePost({id: post.id});
          }
        }
      ]
    );
  }

  const handleReport = () => {
    reportPost({id: post.id});
  }

  return (
    <Menu>
      <MenuTrigger>
        <View style={[itemsCenter, styles.dotSymbol]}>
          <Image style={[styles.settingImg, resizeCover]} source={IMAGES_PATH.setting} />
        </View>
      </MenuTrigger>
      <MenuOptions customStyles={{optionText: {fontSize: Size(1.2)}}}>
        {isMyPost ? (
          <>
            <MenuOption onSelect={handleEdit} text='Edit' />
            <MenuOption onSelect={handleDelete} text='Delete' />
          </>
        ) : (
          <>
            <MenuOption onSelect={handleHide} text='Hide' />
            <MenuOption onSelect={handleReport} text='Report' />
          </>
        )}
      </MenuOptions>
    </Menu>
  )
};

const actions = {
  hidePost,
  deletePost,
  reportPost
}

export default compose(
  connect(null, actions)
)(PopupMenu);
