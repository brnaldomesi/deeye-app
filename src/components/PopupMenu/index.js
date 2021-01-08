import { Image, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import React, {useCallback, useState} from 'react';
import { itemsCenter, resizeCover } from 'src/styles';

import { IMAGES_PATH } from 'src/config/constants';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import { togglePostVisibility } from 'src/redux/modules/posts';
import { useFocusEffect } from '@react-navigation/native';

const PopupMenu = ({
  isMyPost, 
  visible,
  togglePostVisibility,
  id
}) => {
  const [visibleFlag, setVisibleFlag] = useState(!!visible);

  useFocusEffect(useCallback(
    () => {
      console.log('final', visible)
      setVisibleFlag(visible);
    }, [visible])
  );

  const handleEdit = () => {

  }

  const toggleVisibility = () => {
    togglePostVisibility({
      id: id,
      data: {visible: !visibleFlag}
    });
    setVisibleFlag(!visibleFlag);
  }

  const handleDelete = () => {
    
  }

  console.log('popupmenu', id, visible, visibleFlag)

  return (
    <Menu>
      <MenuTrigger>
        <View style={[itemsCenter, styles.dotSymbol]}>
          <Image style={[styles.settingImg, resizeCover]} source={IMAGES_PATH.setting} />
        </View>
      </MenuTrigger>
      <MenuOptions>
        {isMyPost &&
          <> 
            <MenuOption onSelect={handleEdit} text='Edit' />
            <MenuOption onSelect={toggleVisibility} text={visibleFlag ? 'Hide' : 'Unhide'} />
            <MenuOption onSelect={handleDelete} text='Delete' />
          </>
        }
      </MenuOptions>
    </Menu>
  )
};

const actions = {
  togglePostVisibility
}

export default compose(
  connect(null, actions)
)(PopupMenu);
