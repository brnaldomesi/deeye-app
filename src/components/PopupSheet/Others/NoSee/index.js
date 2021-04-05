import * as RootNavigation from 'src/navigators/Ref';

import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { RadioButton } from 'react-native-paper';
import React, {useState} from 'react';
import styles from './styles';

const NoSee = () => {

  const [value, setValue] = useState('1');

  const handleClose = () => {
    RootNavigation.navigate('Init');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="x-circle" style={styles.icon} onPress={handleClose}></Icon>
        <Text style={styles.header_text}>Don't want to see this</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.title_header}>Tell us why you don't want to see this</Text>
        <Text style={styles.title_footer}>Your feedback will help us improve your experience</Text>
      </View>
      <View style={styles.content}>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="1" />
            <Text style={styles.radio_title}>I am not interested in this post</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="2" />
            <Text style={styles.radio_title}>I've seen too many of this posts</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="3" />
            <Text style={styles.radio_title}>I've seen too many posts from this author/user</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="4" />
            <Text style={styles.radio_title}>I've seen this post before</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="5" />
            <Text style={styles.radio_title}>This post is old</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="6" />
            <Text style={styles.radio_title}>It's something else</Text>
          </View>
        </RadioButton.Group>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer_content}>If you think this goes against our Community Policies, please let us know</Text>
        <Text style={styles.footer_info}>Report this post</Text>
      </View>
      <View style={styles.btn_container}>
        <TouchableOpacity style={styles.btn}><Text style={styles.btn_text}>Submit</Text></TouchableOpacity>
      </View>
    </View>
  )
};

export default NoSee;
