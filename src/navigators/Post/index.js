import React, { useCallback, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { RNCamera } from 'react-native-camera';
import Button from 'src/components/Button';


import { Text } from 'react-native';

const cameraPermissionOption={
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
      setPosts(posts => posts.concat([{
        type: DocumentPicker.types.images,
        uri: data.uri
      }]))
    }
  }, [])

  const handleCancelCamera = useCallback(() => setCameraView(false), [])

  return (
    <>
      <Button title='Add Photo' onPress={handleAddPostPress(DocumentPicker.types.images)} />
      <Button title='Add Video' onPress={handleAddPostPress(DocumentPicker.types.video)} />
      <Button title='Take Photo' onPress={handleTakePhotoPress} />

      {cameraView && (
        <View>
          <RNCamera
            ref={camera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={cameraPermissionOption}
          />
          <Button onPress={handleTakePicture} title='SNAP' />
          <Button onPress={handleCancelCamera} title='Cancel' />
        </View>
      )}
    </>
  )
}

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
