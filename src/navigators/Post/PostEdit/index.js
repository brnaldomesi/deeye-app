import {
  Alert,
  Image,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';
import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo
} from 'react';
import {
  basicPadding,
  bgWhite, d_flex,
  flexOne,
  flexRow,
  itemsCenter, mt1,
  mx1,
  p1,
  roundMediumSizeButtonStyle, Size,
  textDot7
} from 'src/styles';
import { updatePost, uploadFile, deleteFile } from 'src/redux/modules/posts';
import { refineJSON } from 'src/utils/helpers';
import Button from 'src/components/Button';
import DocumentPicker from 'react-native-document-picker';
import Header from '../components/Header';
import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import Slider from 'react-native-app-intro-slider';
import VideoPlayer from 'react-native-video-controls';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import LinkPreview from "react-native-link-preview";
import debouce from 'lodash.debounce';
import { validURL } from 'src/utils/helpers'
import {ASSET_BASE_URL, BASE_URL} from "../../../config/apipath";
import FastImage from "react-native-fast-image";

const androidCameraPermissionOptions = {
  title: 'Permission to use camera',
  message: 'We need your permission to use your camera',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
}

const PostEdit = ({
                      route,
                      navigation,
                      updatePost,
                      uploadFile,
                      deleteFile,
                    }) => {

  const {post} = route.params;
  const [description, setDescription] = useState(post.post_type === 'link' ? post.link : post.description);
  const [slide, setSlide] = useState(0)
  const [cameraView, setCameraView] = useState(false)
  const [posts, setPosts] = useState(post.post_attachments.map((item) => {
    return {id: item.id, type: item.file_type === 'Image' ? 'image/*' : 'video/*', uri: ASSET_BASE_URL + item.path}
  }));
  const [attachments, setAttachments] = useState(post.post_attachments);
  const camera = useRef(null)
  const slider = useRef(null)
  const [postType, setPostType] = useState(post.post_type);

  //parse
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const isMountedRef = useRef(null);

  const updateQuery = () => {

    if (posts.length !== 0) {
      if (title !== '') {
        emptyUrlContent()
      }
      return;
    }

    const isUrl = validURL(description);

    if (isUrl) {
      setPostType('link');
      handleParse();
    } else {
      setPostType('text');
      emptyUrlContent()
    }
  };

  const delayedQuery = useCallback(debouce(updateQuery, 500), [description, posts]);

  useEffect(() => {
    isMountedRef.current = true;

    delayedQuery();

    return (() => {
      isMountedRef.current = false;
      delayedQuery.cancel();
    });
  }, [description, delayedQuery]);

  const emptyUrlContent = () => {
    setTitle('');
    setThumbnail(null);
    setIcon(null);
  };

  const handleUpload = (data, type) => {
    const formData = new FormData();
    formData.append('file', data);
    formData.append('file_type', type);
    uploadFile({
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      success: res => {
        setPostType(type);

        const refinedRes = refineJSON(res);
        setAttachments(attachments => attachments.concat([{
          id: refinedRes.id,
          attachment_type: 'General',
          uri: data.uri
        }]));
      },
      fail: err => {
        console.error(err)
      }
    });
  }

  const handlePost = () => {
    updatePost({
      id: post.id,
      data: {
        post_type: postType,
        attachments,
        description: postType === 'link' ? '' : description,
        link: postType === 'link' ? description : ''
      },
      success: res => {
        navigation.navigate('Home');
      },
      fail: err => {
        console.error(err)
      }
    })
  }

  const handleAddPostPress = useCallback(mediaType => async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [mediaType],
      });
      setPosts(posts => posts.concat([{ type: mediaType, uri: res.uri , id: 0}]));
      handleUpload(res, mediaType === 'image/*' ? 'Image' : 'Video');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }, [])

  const handleTakePhotoPress = useCallback(() => {
    setCameraView(true)
  }, [])

  const handleTakePicture = useCallback(async () => {
    if (camera.current) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);
      setCameraView(false)
      setPosts(posts => posts.concat([{
        type: DocumentPicker.types.images,
        uri: data.uri,
        id: 0
      }]))

      const bodyData = {
        uri: data.uri,
        type: "image/jpg",
        name: 'picture.jpg'
      }
      handleUpload(bodyData, 'Image');
    }
  }, [])

  const handleCancelCamera = useCallback(() => {
    setCameraView(false);
  }, [])

  const handleDeletePostPress = useCallback(
    (index, uri) => () => {
      let id = posts[index].id;
      Alert.alert(
        'Delete',
        'Are you sure to delete?',
        [
          {
            text: 'No'
          },
          {
            text: 'Yes',
            onPress: () => {
              if (id !== 0) {
                deleteFile({
                  id: id,
                  post_id: post.id,
                  success: res => {
                    setPostType(posts.length === 0 ? 'text' : postType);
                    setPosts(posts => posts.filter((item, key) => key !== index ));
                    setAttachments(attachments => attachments.filter((item, key) => key !== index));
                    if(slider.current) {
                      slider.current.goToSlide(0, true)
                    }
                  },
                  fail: err => {
                    console.error(err)
                  }
                })
              } else {
                setPostType(posts.length === 0 ? 'text' : postType);
                setPosts(posts => posts.filter((item, key) => key !== index ));
                setAttachments(attachments => attachments.filter((item, key) => key !== index));
                if(slider.current) {
                  slider.current.goToSlide(0, true)
                }
              }
            }
          }
        ]
      )},
    [posts]
  )

  const renderPost = ({ item: { type, uri }, index }) => (
    <View style={styles.post}>
      {type === DocumentPicker.types.images ? (
        <FastImage
          source={{ uri }}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.post}
        />
      ) : type === DocumentPicker.types.video && (
        <VideoPlayer source={{ uri }} style={styles.post} paused={true} />
      )}
      <Button
        title="Delete"
        onPress={handleDeletePostPress(index, uri)}
        style={styles.deletePost}
      />
    </View>
  )

  const handleClose = () => {
    navigation.navigate('Home');
  };

  const handleMissing = () => {
    navigation.navigate('MissingPerson');
  };

  const handleParse = () => {
    LinkPreview.getPreview(description).then(data => {
      switch (data.mediaType) {
        case 'website':
          setTitle(data.title);
          setThumbnail(data.images.length !== 0 ? data.images[0] : null);
          setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
          break;
        case 'video.other':
          setTitle(data.title);
          setThumbnail(data.images.length !== 0 ? data.images[0] : null);
          setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
          break;
        case 'image':
          setTitle('Image');
          setThumbnail(data.url);
          setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
          break;
        case 'audio':
          setTitle('Audio');
          setThumbnail(null);
          setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
          break;
        case 'video':
          setTitle('Video');
          setThumbnail(null);
          setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
          break;
        case 'application':
          setTitle('Application');
          setThumbnail(null);
          setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
          break;
        case 'article':
          setTitle(data.title);
          setThumbnail(data.images.length !== 0 ? data.images[0] : null);
          setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
          break;
        default:
          emptyUrlContent()
          break;
      }
    });
  };

  return (
    <View style={styles.root}>
      <View style={[flexOne, bgWhite]}>
        <Header
          handleClose={handleClose}
          handlePost={handlePost}
          title="Post Edit"
          rightButton
          buttonPrimary={description !== ''}
        />
        {posts.length > 0 &&
        <View style={styles.sliderView}>
          <Slider
            data={posts}
            renderItem={renderPost}
            showNextButton={false}
            showDoneButton={false}
            dotClickEnabled={false}
            onSlideChange={setSlide}
            keyExtractor={(item, index) => index.toString()}
            ref={slider}
            dotStyle={{visibility: 'none'}}
            activeDotStyle={{visibility: 'none'}}
          />
        </View>
        }

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
            <View style={[itemsCenter, p1]}>
              <View style={flexRow}>
                <MyButton onPress={handleTakePicture} title="Snap" variant="primary" style={[roundMediumSizeButtonStyle, mx1]} />
                <MyButton onPress={handleCancelCamera} title="Cancel" variant="primary" style={[roundMediumSizeButtonStyle, mx1]} />
              </View>
            </View>
          </View>
        )}

        <View style={p1}>
          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={text => setDescription(text)}
            value={description}
            textAlignVertical="top"
            placeholder="What would you like to share?"
          />
        </View>

        <View style={p1}>
          <View style={[mt1]}>
            <Image style={{width: '100%', height: Size(15), resizeMode: 'contain'}} source={{uri: thumbnail}}/>
            <View style={d_flex}>
              <Image style={{width: Size(1), height: Size(1), resizeMode: 'contain'}} source={{uri: icon}}/>
              <Text>{' '}{title}</Text>
            </View>
          </View>
        </View>

      </View>
      {(post.post_type !== 'link' && post.post_type !== 'text') && <View style={[flexRow, p1]}>
        <View style={flexOne}>
          <MyButton onPress={handleAddPostPress(DocumentPicker.types.images)}>
            <Image style={[styles.icon, styles.photoSizeSelect1]} source={IMAGES_PATH.photoSizeSelect1} />
            <Text style={textDot7}>Add Photo</Text>
          </MyButton>
        </View>
        <View style={flexOne}>
          <MyButton onPress={handleAddPostPress(DocumentPicker.types.video)}>
            <Image style={[styles.icon, styles.featherVideo1]} source={IMAGES_PATH.featherVideo1} />
            <Text style={textDot7}>Add Video</Text>
          </MyButton>
        </View>
        <View style={flexOne}>
          <MyButton onPress={handleTakePhotoPress}>
            <Image style={[styles.icon, styles.camera]} source={IMAGES_PATH.camera} />
            <Text style={textDot7}>Take Photo</Text>
          </MyButton>
        </View>
        <View style={flexOne}>
          <MyButton onPress={handleMissing}>
            <Image style={[styles.icon, styles.shapeActive3]} source={IMAGES_PATH.shapeActive3} />
            <Text style={textDot7}>Missing Person</Text>
          </MyButton>
        </View>
      </View>}
    </View>
  )
}

PostEdit.propTypes = {
  uploadFile: PropTypes.func,
  deleteFile: PropTypes.func,
  updatePost: PropTypes.func,
}

const actions = {
  uploadFile,
  updatePost,
  deleteFile,
}

export default compose(
  connect(null, actions)
)(PostEdit);
