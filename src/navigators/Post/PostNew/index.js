import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {
  basicPadding,
  bgSecodary,
  bgWhite,
  flexOne,
  flexRow,
  loginHeaderStyle,
  mlp5,
  myAuto,
  p1,
  textXl
} from 'src/styles';

import { ASSET_BASE_URL } from 'src/config/apipath';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar } from 'react-native-elements';
import Header from '../components/Header';
import IconButton from 'src/components/IconButton';
import styles from './styles';

const PostNew = ({ navigation }) => {
  const [avatarPath, setAvatarPath] = useState(null);
  AsyncStorage.getItem('profile').then(profile => setAvatarPath(ASSET_BASE_URL + JSON.parse(profile).avatar_path));

  const handleClose = () => {
    navigation.navigate('Home');
  };

  const handleMissing = () => {
    navigation.navigate('MissingPerson');
  };

  const handleVideo = () => {
    navigation.navigate('PostCreate', { postType: 'Video' });
  };

  const handlePhoto = () => {
    navigation.navigate('PostCreate', { postType: 'Image' });
  };

  return (
    <View style={styles.root}>
      <View style={[flexOne, bgWhite]}>
        <Header handleClose={handleClose} buttonPrimary title="Share your post" />
        <View style={[p1, flexRow]}>
          <Avatar
            rounded
            source={{uri: avatarPath}}
          />
          <View style={[myAuto, mlp5]}>
            <Text>What do you want to talk about?</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomMenu}>
        <View style={styles.bottomMenuHeader}>
          <View style={styles.bar} />
          <Text style={textXl}>You can create</Text>
        </View>
        <View style={basicPadding}>
          <View style={p1}>
            <IconButton 
              onPress={handleMissing}
              text='Add missing person post'
              imageName="shapeActive3"
              aspectRatio={31/42}
            />
          </View>
          <View style={p1}>
            <IconButton 
              onPress={handlePhoto}
              text='Add photo post'
              imageName="photoSizeSelect1"
              aspectRatio={52/43}
            />
          </View>
          <View style={p1}>
            <IconButton 
              onPress={handleVideo}
              text='Add video post'
              imageName="featherVideo1"
              aspectRatio={104/67}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default PostNew;
