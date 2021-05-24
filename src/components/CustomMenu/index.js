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

const CustomMenu = ({
  list,
  callback,
  data
}) => {

  const handleItem = (index) => () => {
    callback(index, data);
  }

  return (
    <Menu>
      <MenuTrigger>
        <View style={[itemsCenter, styles.dotSymbol]}>
          <Image style={[styles.settingImg, resizeCover]} source={IMAGES_PATH.setting} />
        </View>
      </MenuTrigger>
      <MenuOptions customStyles={{optionText: {fontSize: Size(1)}}}>
           {list.map((item, key) => {
             return <MenuOption key={key} onSelect={handleItem(key)} text={item}/>
           })}
      </MenuOptions>
    </Menu>
  )
};

export default CustomMenu;
