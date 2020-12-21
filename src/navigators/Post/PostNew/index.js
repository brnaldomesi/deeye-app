import { Text, View } from 'react-native';
import {
  basicPadding,
  bgButtonSecodary,
  bgWhite,
  flexOne,
  flexRowDirection,
  loginHeaderStyle,
  marginVerticalAuto,
  p1,
  textXl
} from 'src/styles';

import { Avatar } from 'react-native-elements';
import Header from '../components/Header';
import IconButton from 'src/components/IconButton';
import React from 'react';
import styles from './styles';

const PostNew = ({ navigation }) => {
  const handleClose = () => {
    navigation.navigate('Home');
  };

  const handleMissing = () => {
    
  };

  const handleVideo = () => {
    
  };

  const handlePhoto = () => {
    
  };

  return (
    <View style={styles.root}>
      <View style={[flexOne, bgWhite]}>
        <Header handleClose={handleClose} title="Share your post" />
        <View style={[p1, flexRowDirection]}>
          <Avatar
            rounded
            icon={{name: 'user', type: 'font-awesome', color: 'black'}}
          />
          <View style={marginVerticalAuto}>
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
