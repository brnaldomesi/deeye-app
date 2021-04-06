import * as RootNavigation from 'src/navigators/Ref';

import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import {
  reportPost,
} from 'src/redux/modules/posts';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { RadioButton } from 'react-native-paper';
import React, {useState} from 'react';
import styles from './styles';

const NoSee = ({reportPost, ...props}) => {

  const [value, setValue] = useState('I am not interested in this post');

  const handleClose = () => {
    RootNavigation.navigate('Init');
  }

  const { route } = props;
  const post_id = route.params.post;

  const handleSubmit = () => {
    reportPost({id: post_id, data: { reason: value}});
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
            <RadioButton style={styles.radio_btn} value="I am not interested in this post" />
            <Text style={styles.radio_title}>I am not interested in this post</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="I've seen too many of this posts" />
            <Text style={styles.radio_title}>I've seen too many of this posts</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="I've seen too many posts from this author/user" />
            <Text style={styles.radio_title}>I've seen too many posts from this author/user</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="I've seen this post before" />
            <Text style={styles.radio_title}>I've seen this post before</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="This post is old" />
            <Text style={styles.radio_title}>This post is old</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton style={styles.radio_btn} value="It's something else" />
            <Text style={styles.radio_title}>It's something else</Text>
          </View>
        </RadioButton.Group>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer_content}>If you think this goes against our Community Policies, please let us know</Text>
        <Text style={styles.footer_info}>Report this post</Text>
      </View>
      <View style={styles.btn_container}>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}><Text style={styles.btn_text}>Submit</Text></TouchableOpacity>
      </View>
    </View>
  )
};

const actions = {
  reportPost,
}

export default compose(
  connect(null, actions)
)(NoSee);
