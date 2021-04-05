import {
  Text,
  View
} from 'react-native';
import {
  ListItem,
} from 'react-native-elements';

import React from 'react';
import styles from './styles';

const Report = ({
  data,
  title,
  onMenuItemSelect
}) => {

  const list = data;

  return (
    <View>
      {title[0].header ? <Text style={styles.header_title}>{title[0].header}</Text> : <></>}
      <Text style={styles.header_content}>{title[0].footer}</Text>
      {list.map((item, index) => (
        <ListItem bottomDivider key={index} onPress={() => onMenuItemSelect(item.onCallback)}>
          <ListItem.Content style={styles.item}>
            <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
            {item.content ? <ListItem.Subtitle style={styles.content}>{item.content}</ListItem.Subtitle> : <></>}
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  )
}

export default Report;