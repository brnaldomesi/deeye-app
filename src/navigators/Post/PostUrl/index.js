import PostForm from 'src/navigators/Post/components/PostForm';
import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View, Text, Image} from 'react-native';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {updatePost} from 'src/redux/modules/posts';
import LinkPreview from 'react-native-link-preview';
import {d_flex, mt1, p1, Size} from "../../../styles";

const PostUrl = ({
                   route,
                   updatePost
                 }) => {

  // const [url, setUrl] = useState('https://www.upwork.com/o/profiles/users/~0157cbfb5805a1fbb3/');
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=MejbOFk7H6c');
  // const [url, setUrl] = useState('https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-600w-407021107.jpg');
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleParse = () => {
    LinkPreview.getPreview(url).then(data => {
      switch (data.mediaType) {
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
        default:
          setTitle('valid type');
          setThumbnail(null);
          setIcon(null);
          break;
      }
    });
  };

  const handleChange = (text) => {
    setUrl(text);
  };

  return (
    <View>
      <View style={p1}>
        <TextInput placeholder={'url'} value={url} onChange={handleChange}/>
        <TouchableOpacity
          onPress={handleParse}>
          <Text>Parse</Text>
        </TouchableOpacity>
        <View style={mt1}>
          <Image style={{width: '100%', height: Size(15), resizeMode: 'contain'}} source={{uri: thumbnail}}/>
          <View style={d_flex}>
            <Image style={{width: Size(1), height: Size(1), resizeMode: 'contain'}} source={{uri: icon}}/>
            <Text>{' '}{title}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const actions = {
  updatePost
}

export default compose(
  connect(null, actions)
)(PostUrl);

