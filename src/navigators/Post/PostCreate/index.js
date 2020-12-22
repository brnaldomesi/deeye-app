import {
  Image,
  Text,
  TextInput,
  View
} from 'react-native';
import React, { useState } from 'react';
import {
  basicPadding,
  bgSecodary,
  bgWhite,
  flexOne,
  flexRowDirection,
  justifyAround,
  loginHeaderStyle,
  p1,
  textXl
} from 'src/styles';

import { Avatar } from 'react-native-elements';
import Header from '../components/Header';
import { IMAGES_PATH } from 'src/config/constants';
import IconButton from 'src/components/IconButton';
import MyButton from 'src/components/MyButton';
import styles from './styles';

const PostCreate = ({ navigation }) => {
  const [initState, setInitState] = useState(true);
  const [description, setDescription] = useState('What would you like to share?');

  const handleClose = () => {
    navigation.navigate('Home');
  };

  const handleMissing = () => {
  };

  const handleVideo = () => {
    
  };

  const handlePhoto = () => {
    
  };

  const handleTake = () => {
    
  };

  return (
    <View style={styles.root}>
      <View style={[flexOne, bgWhite]}>
        <Header handleClose={handleClose} buttonPrimary title="Share Post" rightButton />
        <View style={p1}>
          <TextInput 
            multiline
            numberOfLines={4}
            onChangeText={text => setDescription(text)}
            value={description}
          />
        </View>
      </View>
      {!initState ? ( 
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
                onPress={handleTake}
                text='Take a Photo'
                imageName="camera"
                aspectRatio={113/94}
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
      ) : (
        <View style={[flexRowDirection, p1, justifyAround]}>
          <MyButton onPress={handlePhoto}>
            <Image style={[styles.icon, styles.photoSizeSelect1]} source={IMAGES_PATH.photoSizeSelect1} />
            <Text>Add Photo</Text>
          </MyButton>
          <MyButton onPress={handleVideo}>
            <Image style={[styles.icon, styles.featherVideo1]} source={IMAGES_PATH.featherVideo1} />
            <Text>Add Video</Text>
          </MyButton>
          <MyButton onPress={handleTake}>
            <Image style={[styles.icon, styles.camera]} source={IMAGES_PATH.camera} />
            <Text>Take Photo</Text>
          </MyButton>
          <MyButton onPress={handleMissing}>
            <Image style={[styles.icon, styles.shapeActive3]} source={IMAGES_PATH.shapeActive3} />
            <Text>Missing Person</Text>
          </MyButton>
        </View>                             
      )}
    </View>
  )
}

export default PostCreate;
