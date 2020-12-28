import { Avatar, Tile } from 'react-native-elements';
import {
  Image,
  Text,
  View
} from 'react-native';
import React, { useEffect } from 'react';
import {
  Size,
  bgSecodary,
  bgWhite,
  flexOne,
  flexRowDirection,
  fontWeightBold,
  my1,
  p1,
  primaryColor,
  px1,
  py1,
  resizeCover
} from 'src/styles';
import { getPostsList, postsListSelector } from 'src/redux/modules/posts';

import { ASSET_BASE_URL } from 'src/config/constants';
import { Divider } from 'react-native-elements';
import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import { tokenSelector } from 'src/redux/modules/auth';

const Feed = ({ post }) => {
  const handlePress = () => {

  }

  const handleComment = () => {

  }

  const handleSave = () => {

  }

  const handleSupport = () => {

  }

  const handleShare = () => {

  }

  const handleSend = () => {

  }

  return (
    <View style={[bgWhite, my1]}>
      <View style={{
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        elevation: 9,
      }}>
        <Image
          style={[styles.thumbnail, resizeCover]}
          source={{
            uri: ASSET_BASE_URL + post.post_attachments[0].path,
          }}
        />
      </View>
      <View style={[flexRowDirection, styles.caption]}>
        <View>
          <Avatar
            rounded
            icon={{name: 'user', type: 'font-awesome', color: 'black'}}
          />
          <Text style={[primaryColor, fontWeightBold]}>Mike F.</Text>
          <Text>2s min</Text>
        </View>
        <View style={[flexOne, px1]}>
          <Text>{post.description}</Text>
        </View>
        <View>
          <MyButton onPress={handlePress}>
            <Image style={styles.settingImg} source={IMAGES_PATH.setting} />
          </MyButton>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View>
        <View>
        </View>
        <View>
          <View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <MyButton onPress={handleComment}>
            <Image style={styles.commentImg} source={IMAGES_PATH.comment} />
            <Text>Comment</Text>
          </MyButton>
        </View>
        <View>
          <MyButton onPress={handleSave}>
            <Image style={styles.saveImg} source={IMAGES_PATH.save} />
            <Text>Save</Text>
          </MyButton>
        </View>
        <View>
          <MyButton onPress={handleSupport}>
            <Image style={styles.suppportImg} source={IMAGES_PATH.support} />
            <Text>Support</Text>
          </MyButton>
        </View>
        <View>
          <MyButton onPress={handleShare}>
            <Image style={styles.shareImg} source={IMAGES_PATH.share} />
            <Text>Share</Text>
          </MyButton>
        </View>
        <View>
          <MyButton onPress={handleSend}>
            <Image style={styles.sendImg} source={IMAGES_PATH.send} />
            <Text>Send</Text>
          </MyButton>
        </View>
      </View>
    </View>
  );
};

Feed.propTypes = {
}

const actions = {
}

const selector = createStructuredSelector({
});

export default compose(
  connect(selector, actions)
)(Feed);
