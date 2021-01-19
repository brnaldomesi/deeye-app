import {
  Image,
  Text,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  likePost,
  savePost,
  sharePost
} from 'src/redux/modules/posts';

import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
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
  fromDetail
}) => {
  const [saved, setSaved] = useState(post.saved);
  const [liked, setLiked] = useState(post.liked);

  const handleComment = () => {

  }

  const handleSave = () => {
    savePost({
      id: post.id,
      success: res => setSaved(res.saved)
    });
  }

  const handleLike = () => {
    likePost({
      id: post.id,
      success: res => setLiked(res.liked)
    })
  }

  const handleShare = () => {
    sharePost({id: post.id});
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
          <Image style={styles.saveImg} source={(fromDetail ? saved : post.saved) ? IMAGES_PATH.save1 : IMAGES_PATH.save} />
          <Text style={fromDetail ? textWhite : undefined}>Save</Text>
        </MyButton>
      </View>
      <View>
        <MyButton onPress={handleLike}>
          <Image style={styles.suppportImg} source={(fromDetail ? liked : post.liked) ? IMAGES_PATH.support1 : IMAGES_PATH.support} />
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
