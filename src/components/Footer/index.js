import * as RootNavigation from 'src/navigators/Ref';

import {
  Colors,
  Size,
  itemsCenter
} from 'src/styles'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import AddIcon from 'src/components/icons/add'
import AntIcon from 'react-native-vector-icons/AntDesign';
import Button from 'src/components/Button'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Footer from 'src/components/icons/footer'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import styles from './styles';

export default ({ style }) => {
  const handleAdd = () => {
    RootNavigation.navigate('PostNew');
  }

  return (
    <View style={style}>
      <View style={styles.outline}>
        <View style={styles.wing} />
        <Footer />
        <View style={styles.wing} />
      </View>
      <View style={styles.height} />
      <View style={styles.content}>
        <View style={itemsCenter}>
          <MCIcon name="access-point" size={30} color={Colors.secondary} />
          <Text style={{color: Colors.secondary}}>FEEDS</Text>
        </View>
        <View style={itemsCenter}>
          <AntIcon name="deleteuser" size={30} color={Colors.primary} />
          <Text style={{color: Colors.primary}}>MISSING</Text>
        </View>
        <View></View>
        <View style={itemsCenter}>
          <MCIcon name="bell-outline" size={30} color={Colors.secondary} />
          <Text style={{color: Colors.secondary}}>ALERT</Text>
        </View>
        <View style={itemsCenter}>
          <FAIcon name="envelope-o" size={30} color={Colors.secondary} />
          <Text style={{color: Colors.secondary}}>MESSAGES</Text>
        </View>
      </View>
      <View style={styles.addButtonView}>
        <Button style={styles.addButton} onPress={handleAdd}>
          <AddIcon />
        </Button>
      </View>
    </View>
  );
};
