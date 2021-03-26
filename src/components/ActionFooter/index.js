import * as RootNavigation from 'src/navigators/Ref';

import {
  Image,
  Text,
  View
} from 'react-native';
import {
  likePost,
  savePost,
  sharePost
} from 'src/redux/modules/posts';

import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import {
  textWhite
} from 'src/styles';

const ActionFooter = ({
  post,
  style,
  likePost,
  savePost,
  sharePost,
  fromDetail,
  isShare
}) => {
  const handleComment = () => {
    RootNavigation.navigate('PostDetailForComment', {id: post.id});
  }

  const handleSave = () => {
    savePost({ id: post.id });
  }

  const handleLike = () => {
    likePost({ id: post.id })
  }

  const handleShare = () => {
    if (isShare) {
      RootNavigation.navigate('SharePost', {post: post});
    }
    // sharePost({ id: post.id, data: { description: 'Share post description' } });
  }

  const handleSend = () => {

  }

  return (
    <View style={style}>
      <View>
        <MyButton onPress={handleComment}>
          <Image style={styles.commentImg} source={IMAGES_PATH.comment} />
          <Text style={fromDetail ? textWhite : undefined}>Comment</Text>
        </MyButton>
      </View>
      <View>
        <MyButton onPress={handleSave}>
          <Image style={styles.saveImg} source={post.saved ? IMAGES_PATH.save1 : IMAGES_PATH.save} />
          <Text style={fromDetail ? textWhite : undefined}>Save</Text>
        </MyButton>
      </View>
      <View>
        <MyButton onPress={handleLike}>
          <Image style={styles.suppportImg} source={post.liked ? IMAGES_PATH.support1 : IMAGES_PATH.support} />
          <Text style={fromDetail ? textWhite : undefined}>Support</Text>
        </MyButton>
      </View>
      <View>
        <MyButton onPress={handleShare}>
          <Image style={styles.shareImg} source={IMAGES_PATH.share} />
          <Text style={fromDetail ? textWhite : undefined}>Share</Text>
        </MyButton>
      </View>
      <View>
        <MyButton onPress={handleSend}>
          <Image style={styles.sendImg} source={IMAGES_PATH.send} />
          <Text style={fromDetail ? textWhite : undefined}>Send</Text>
        </MyButton>
      </View>
    </View>
  );
};

const actions = {
  savePost,
  likePost,
  sharePost
}

export default compose(
  connect(null, actions)
)(ActionFooter);
