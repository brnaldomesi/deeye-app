import { Avatar, Tile } from 'react-native-elements';
import {
  Image,
  Text,
  View
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import React, { useEffect } from 'react';
import {
  Size,
  bgSecodary,
  bgTransparent,
  bgWhite,
  flexCol,
  flexOne,
  fontWeightBold,
  my1,
  p1,
  primaryColor,
  px1,
  py1,
  resizeCover,
  roundedFull
} from 'src/styles';
import {
  likePost,
  savePost,
  sharePost
} from 'src/redux/modules/posts';

import { ASSET_BASE_URL } from 'src/config/constants';
import { Divider } from 'react-native-elements';
import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import PopupMenu from 'src/components/PopupMenu';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import { tokenSelector } from 'src/redux/modules/auth';

const Feed = ({ 
  post, 
  profileId,
  savePost,
  likePost,
  sharePost 
}) => {
  const handleComment = () => {

  }

  const handleSave = () => {
    savePost({id: post.id});
  }

  const handleLike = () => {
    likePost({id: post.id})
  }

  const handleShare = () => {

  }

  const handleSend = () => {

  }

  return (
    <View style={[bgWhite, my1]}>
      <View>
        <Image
          style={[styles.thumbnail, resizeCover]}
          source={{
            uri: post.post_attachments[0] ? ASSET_BASE_URL + post.post_attachments[0].path : undefined,
          }}
        />
      </View>
      <View style={[flexCol, styles.caption]}>
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
          <PopupMenu post={post} isMyPost={post.profile_id === profileId} />
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
            <Image style={styles.saveImg} source={post.saved ? IMAGES_PATH.save1 : IMAGES_PATH.save} />
            <Text>Save</Text>
          </MyButton>
        </View>
        <View>
          <MyButton onPress={handleLike}>
            <Image style={styles.suppportImg} source={post.liked ? IMAGES_PATH.support1 : IMAGES_PATH.support} />
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
  profileId: PropTypes.number.isRequired
}

const actions = {
  savePost,
  likePost,
  sharePost
}

export default compose(
  connect(null, actions)
)(Feed);
