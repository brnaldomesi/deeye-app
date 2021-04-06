import * as RootNavigation from 'src/navigators/Ref';

import {
  Alert,
} from 'react-native';
import {
  ListItem,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import React, {useCallback, useState, useRef} from 'react';
import {
  deletePost,
} from 'src/redux/modules/posts';

import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';


const Mine = ({
  post,
  deletePost,
}) => {

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

  const handleEdit = () => {
    RootNavigation.navigate(post.post_type === 'MissingPerson' ? 'MissingPostEdit' : 'PostEdit', {post});
  }

  const list_mine = [
    { title: 'Edit', content: 'You can edit this post', icon:'edit', onPress: handleEdit },
    { title: 'Delete', content: 'You can delete this post', icon:'trash-2', onPress: handleDelete },
  ];

  return (
    <>
    {list_mine.map((item, index) => (
      <ListItem style={styles.list} key={index} bottomDivider onPress={() => item.onPress()} >
        <Icon style={styles.icon} name={item.icon}/>
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
          <ListItem.Subtitle style={styles.content}>{item.content}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))}
    </>
  )
}

const actions = {
  deletePost
}

export default compose(
  connect(null, actions)
)(Mine);