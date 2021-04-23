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

  const handleCamera = () => {

  }

  return (
    <View style={styles.root}>
      <View style={[flexOne, bgWhite]}>
        <Header handleClose={handleClose} buttonPrimary title="Share your post" />
        <View style={[p1, flexRow]}>
          {/* <Avatar
            rounded
            source={{uri: avatarPath}}
          /> */}
          <View style={[myAuto, mlp5]}>
            <Text style={styles.subtitle}>What would you like to share?</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomMenu}>
        <View style={styles.bottomMenuHeader}>
          <View style={styles.bar} />
        </View>
        <View style={basicPadding}>
          <View style={p1}>
            <IconButton
              onPress={handlePhoto}
              text='Add Photo'
              imageName="photoSizeSelect1"
              aspectRatio={52/43}
            />
          </View>
          <View style={p1}>
            <IconButton
              onPress={handleVideo}
              text='Add Video'
              imageName="featherVideo1"
              aspectRatio={104/67}
            />
          </View>
          <View style={p1}>
            <IconButton
              onPress={handleCamera}
              text='Take a Photo'
              imageName="camera"
              aspectRatio={50/43}
            />
          </View>
          <View style={p1}>
            <IconButton
              onPress={handleMissing}
              text='Missing Person Post'
              imageName="shapeActive3"
              aspectRatio={31/42}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default PostNew;
