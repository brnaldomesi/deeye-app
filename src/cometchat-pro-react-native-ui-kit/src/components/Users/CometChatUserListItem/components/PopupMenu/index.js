import {
  Image,
  View
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  Size,
  itemsCenter,
  resizeCover
} from 'src/styles';

import { IMAGES_PATH } from 'src/config/constants';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';

const PopupMenu = ({}) => {
  const handleMute = () => {
  }

  const handleView = () => {
  }

  const handleRead = () => {
  }

  return (
    <Menu>
      <MenuTrigger>
        <View style={[itemsCenter, styles.dotSymbol]}>
          <Image style={[styles.settingImg, resizeCover]} source={IMAGES_PATH.setting} />
        </View>
      </MenuTrigger>
      <MenuOptions customStyles={{optionText: {fontSize: Size(1)}}}>
        <MenuOption onSelect={handleMute} text='Mute' />
        <MenuOption onSelect={handleView} text='View Profile' />
        <MenuOption onSelect={handleRead} text='Make Read' />
      </MenuOptions>
    </Menu>
  )
};

const actions = {
}

export default compose(
  connect(null, actions)
)(PopupMenu);
