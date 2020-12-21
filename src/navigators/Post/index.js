import React, { useCallback, useState, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { RNCamera } from 'react-native-camera';
import Button from 'src/components/Button';


import { Text } from 'react-native';

const androidCameraPermissionOptions = {
  title: 'Permission to use camera',
  message: 'We need your permission to use your camera',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
}

const Post = () => {
  const camera = useRef(null)

  const [cameraView, setCameraView] = useState(false)

  const [posts, setPosts] = useState([])

  const handleAddPostPress = useCallback(mediaType => async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [mediaType],
      });
      setPosts(posts => posts.concat([{ type: res.type, uri: res.uri }]))
    } catch (err) {
      // if (DocumentPicker.isCancel(err)) {
      //   // User cancelled the picker, exit any dialogs or menus and move on
      // } else {
      //   throw err;
      // }
    }
    
  }, [])

  const handleTakePhotoPress = useCallback(() => setCameraView(true), [])

  const handleTakePicture = useCallback(async () => {
    if (camera.current) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);
      setCameraView(false)
      setPosts(posts => posts.concat([{
        type: DocumentPicker.types.images,
        uri: data.uri
      }]))
    }
  }, [])

  const handleCancelCamera = useCallback(() => setCameraView(false), [])

  return (
    <View>
      <Button title='Add Photo' onPress={handleAddPostPress(DocumentPicker.types.images)} />
      <Button title='Add Video' onPress={handleAddPostPress(DocumentPicker.types.video)} />
      <Button title='Take Photo' onPress={handleTakePhotoPress} />

      {posts.map(({ type, uri }, key) => (
        <Image source={{ uri }} key={key} style={styles.post}/>
      ))}

      {cameraView && (
        <View style={styles.container}>
          <RNCamera
            ref={camera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={androidCameraPermissionOptions}
            captureAudio={false}
          />
          <Button onPress={handleTakePicture} title='SNAP' />
          <Button onPress={handleCancelCamera} title='Cancel' />
        </View>
      )}
    </View>
  )
}

export default Post;

const styles = StyleSheet.create({
  post: {
    height: 400,
    width: 400
  },
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    flex: 1
  },
  preview: {
    flex: 1
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
