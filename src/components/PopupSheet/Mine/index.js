import {
  ListItem,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import React, {useCallback, useState, useRef} from 'react';

import styles from './styles';


const Mine = ({
  onMenuItemPress,
}) => {

  const handleDelete = () => {
    onMenuItemPress("delete");
  }

  const handleEdit = () => {
    onMenuItemPress("edit");
  }

  const list_mine = [
    { title: 'Edit', content: 'You can edit this post', icon:'edit', onPress: handleEdit },
    { title: 'Delete', content: 'You can delete this post', icon:'trash-2', onPress: handleDelete },
  ];

  return (
    <>
    {list_mine.map((item, index) => (
      <ListItem style={styles.list} key={index} bottomDivider onPress={() => item.onPress()} onMenuItemPress={()=>item.onCallback()}>
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

export default Mine;