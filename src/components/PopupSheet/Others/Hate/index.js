import * as RootNavigation from 'src/navigators/Ref';

import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import {
  hidePost,
  reportPost,
} from 'src/redux/modules/posts';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import React, {useState} from 'react';
import styles from './styles';
import RadioGroup from 'src/components/RadioGroup';

const Hate = ({reportPost, hidePost, ...props}) => {

  const [value, setValue] = useState('I am not interested in this post');

  const handleClose = () => {
    RootNavigation.navigate('Home', { query: 'feeds' });
  }

  const { route } = props;
  const post_id = route.params.post;

  const data = [
      { content: "I'm not interested in this post", onCallback: "not_interest"},
      { content: "I've seen too many of this posts", onCallback: "have_seen" },
      { content: "I've seen too many posts from this author/user", onCallback: "author_user" },
      { content: "I've seen this post befor", onCallback: "before" },
      { content: "This post is old", onCallback: "old" },
      { content: "It's something else", onCallback: "else" },
  ];

  const [reason, setReason] = useState('');

  const handleSelect = (reason) => {
    setReason(reason);
  }

  const handleSubmit = () => {
    reportPost({id: post_id, data: { reason: reason}});
    RootNavigation.navigate('Home', { query: 'feeds' });
    hidePost({id: post_id});
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
      <RadioGroup data={data} onRadioItemPress={handleSelect}/>
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
  hidePost
}

export default compose(
  connect(null, actions)
)(Hate);
