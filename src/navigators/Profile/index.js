import {
  ScrollView,
  Text,
  View
} from 'react-native';

import Posts from './Posts';
import React from 'react';
import { p1 } from 'src/styles';

const Profile = ({navigation}) => {
  return (
    <ScrollView>
      <View style={p1}>
        <Text>My Posts</Text>
      </View>
      <Posts />
    </ScrollView>
  )
};

export default Profile;
