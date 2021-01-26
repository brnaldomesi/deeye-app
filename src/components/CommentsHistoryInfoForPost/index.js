import { Text, View } from 'react-native';
import {
  flexRow,
  justifyBetween,
  myAuto
} from 'src/styles';

import { ASSET_BASE_URL } from 'src/config/constants';
import { Avatar } from 'react-native-elements';
import React from 'react';
import styles from './styles';

const CommentsHistoryInfoForPost = ({post}) => {
  const recentCommentors = post.recent_commentors;
  const commentsCount = post.comments_count;
  const sharesCount = post.shares_count;
  const commentLabel = commentsCount === 0 ? '' : (commentsCount === 1 ? commentsCount + ' Comment' : commentsCount + ' Comments');
  const shareLabel = sharesCount === 0 ? '' : (sharesCount === 1 ? sharesCount + ' Share' : sharesCount + ' Shares');

  return (
    <View style={[justifyBetween, flexRow]}>
      {(commentsCount > 0 || sharesCount > 0)  &&
        <View style={myAuto}>
          <Text>{(commentsCount > 0 && sharesCount > 0) ? commentLabel + ' • ' + shareLabel : commentLabel + shareLabel}</Text>
        </View>
      }
      <View style={flexRow}>
        {recentCommentors && recentCommentors.map((commentor, index) =>
          <View key={commentor.id} style={index > 0 ? styles.avatar : undefined}>
            <Avatar 
              rounded 
              source={{uri: ASSET_BASE_URL + commentor.avatar_path}} 
            />
          </View> 
        )}
      </View>
    </View>
  )
};

export default CommentsHistoryInfoForPost;
