import * as RootNavigation from 'src/navigators/Ref';

import {
  Alert,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import {
  CheckBox,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import React, {useCallback, useState} from 'react';
import {
  Size,
  itemsCenter,
  resizeCover
} from 'src/styles';

import { navigationRef } from 'src/navigators/Ref';
import styles from './styles';

const PopupSheet = () => {

  return (
    <View>
      <View>
        <Icon name="x-circle"></Icon>
        <Text>Don't want to see this</Text>
      </View>
      <View>
        <Text>Tell us why you don't want to see this</Text>
        <Text>Your feedback will help us improve your experience</Text>
      </View>
      <View>
        <CheckBox title="I'm not interested in this post"></CheckBox>
        <CheckBox title="I've seen too many of this posts"></CheckBox>
        <CheckBox title="I've seen too many posts from this author/user"></CheckBox>
        <CheckBox title="I've seen this post before"></CheckBox>
        <CheckBox title="This post is old"></CheckBox>
        <CheckBox title="It's something else"></CheckBox>
      </View>
      <View>
        <Text>If you think this goes against our Community Policies, please let us know</Text>
        <Text>Report this post</Text>
      </View>
      <View>
        <TouchableOpacity>Submit</TouchableOpacity>
      </View>
    </View>
  )

};

export default PopupSheet;
