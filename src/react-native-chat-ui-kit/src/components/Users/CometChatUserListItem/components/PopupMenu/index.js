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
  const handleAction1 = () => {
  }

  const handleAction2 = () => {
  }

  return (
    <Menu>
      <MenuTrigger>
        <View style={[itemsCenter, styles.dotSymbol]}>
          <Image style={[styles.settingImg, resizeCover]} source={IMAGES_PATH.setting} />
        </View>
      </MenuTrigger>
      <MenuOptions customStyles={{optionText: {fontSize: Size(1.2)}}}>
        <MenuOption onSelect={handleAction1} text='Action1' />
        <MenuOption onSelect={handleAction2} text='Action2' />
      </MenuOptions>
    </Menu>
  )
};

const actions = {
}

export default compose(
  connect(null, actions)
)(PopupMenu);
