import * as RootNavigation from 'src/navigators/Ref';

import {
  Alert,
  Image, Text,
  View,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import React, {useCallback, useState} from 'react';
import {
  Size,
  itemsCenter,
  resizeCover, absolute
} from 'src/styles';
import {
  deletePost,
  hidePost,
  reportPost
} from 'src/redux/modules/posts';

import {IMAGES_PATH} from 'src/config/constants';
import {compose} from 'redux';
import {connect} from 'react-redux';
import styles from './styles';
import {Divider} from "react-native-elements";
import * as g from "../../styles";

const PopupBlurMenu = ({
                         post,
                         hidePost,
                         deletePost,
                         reportPost
                       }) => {

  const {Popover} = renderers;
  const arrButton = [{image: IMAGES_PATH.popup_trash, title: 'Delete Post'},
    {image: IMAGES_PATH.popup_eye, title: 'Hide Post'},
    {image: IMAGES_PATH.popup_inbox, title: 'Save as draft'},
    {image: IMAGES_PATH.popup_circle, title: 'Feedback'},];

  const handleEdit = name => () => {
    switch (name) {
      case 'Delete Post':
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
                deletePost({
                  id: post.id,
                  success: () => {
                    RootNavigation.navigate('Home');
                  }
                });
              }
            }
          ]
        );
        break;
      case 'Hide Post':
        break;
      case 'Save as draft':
        break;
      case 'Feedback':
        break;
      default:
        return;
    }
  };


  const optionsStyles = {
    optionsContainer: {
      backgroundColor: '#ffffff80',
      borderRadius: 10
    }
  }

  const optionStyles = {
    optionWrapper: {
      paddingHorizontal: 20
    }
  };


  return (
    <Menu
      style={[{position: 'absolute'}, {right: 10, top: 10}]}
      renderer={Popover}
      rendererProps={{
        placement: 'bottom',
        anchorStyle: {backgroundColor: 'transparent'}
      }}
    >
      <MenuTrigger>
        <View style={[itemsCenter, styles.dotSymbol]}>
          <Image style={[styles.settingImg, resizeCover]} source={IMAGES_PATH.setting_white}/>
        </View>
      </MenuTrigger>
      <MenuOptions style={{backgroundColor: 'transparent'}} customStyles={optionsStyles}>
        {arrButton.map((item, index) =>
          <MenuOption key={item.title}
                      onSelect={handleEdit(item.title)}
                      style={{display: 'flex', flexDirection: 'row'}}
                      customStyles={optionStyles}
          >
            <Image style={[g.resizeCover, styles.iconImg, {marginTop: 4}]} source={item.image}/>
            <Text style={{color: 'white'}}> {item.title}</Text>
            {(index !== arrButton.length - 1) && <Divider style={[g.bgWhite, styles.bottom_divider]}/>}
          </MenuOption>
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
)(PopupBlurMenu);
