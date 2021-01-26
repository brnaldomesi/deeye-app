import {
  Image,
  Text,
  View
} from 'react-native';
import React, { useState } from 'react';
import {
  bgBottomPrimary,
  bgTransparent,
  flexOne,
  flexRow,
  flexWrap,
  itemsEnd,
  justifyBetween,
  ml1,
  mlp5,
  pp5,
  pyDot5,
  resizeContain,
  textBlack
} from 'src/styles';
import {
  commentsForCommentSelector,
  getCommentsForComment,
  likeComment
} from 'src/redux/modules/comments';

import { ASSET_BASE_URL } from 'src/config/constants';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Comments from 'src/components/Comments';
import { IMAGES_PATH } from 'src/config/constants';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getDiffFromToday } from 'src/utils/helpers';
import moment from 'moment';
import styles from './styles';

const Comment = ({ 
  comment, 
  getCommentsForComment, 
  setCommentPosterInfo,
  commentsForComment,
  likeComment,
}) => {
  const commentCountLabel = comment.comments_count + (comment.comments_count > 1 ? ' comments' : ' comment');

  const handleLike = () => {
    likeComment({ id: comment.id })
  }

  const getChildComments = () => {
    getCommentsForComment({ id: comment.id });
  }

  return (
    <View>
      <View style={[justifyBetween, flexRow]}>
        <View style={[flexRow, pyDot5]}>
          {comment.author && 
            <Avatar rounded source={{uri: ASSET_BASE_URL + comment.author.avatar_path}} />
          }
          <View>
            <View style={[bgBottomPrimary, mlp5, flexRow, pp5]}>
              <View style={styles.content}>
                <Text>{comment.text}</Text>
                <View style={flexRow}>
                  <Text>{getDiffFromToday(comment.updated_at)}</Text>
                  <Button 
                    onPress={() => setCommentPosterInfo({id: comment.id, name: comment.author.first_name + ' ' + comment.author.last_name})} 
                    title="Reply" 
                    buttonStyle={[bgTransparent, styles.interactionBtn]}
                    titleStyle={styles.interactionTitle}
                  />
                  {comment.comments_count > 0 &&
                    <Button
                      onPress={getChildComments} 
                      title={commentCountLabel}
                      buttonStyle={[bgTransparent, styles.interactionBtn]}
                      titleStyle={styles.interactionTitle}
                    />
                  }
                </View>
              </View>
              <View style={[itemsEnd, styles.dotSymbol, pp5]}>
                <Image style={[styles.settingImg, resizeContain]} source={IMAGES_PATH.setting} />
              </View>
            </View>
          </View>
        </View>
        <Button
          onPress={handleLike}
          buttonStyle={bgTransparent}
          icon={
            <Image 
              style={[styles.likeImg, resizeContain]} 
              source={comment.liked ? IMAGES_PATH.heart : IMAGES_PATH.heart1} 
            />
          }
        />
      </View>
      {commentsForComment && commentsForComment.length > 0 &&
        <View style={ml1}>
          <Comments 
            comments={commentsForComment} 
            setCommentPosterInfo={setCommentPosterInfo}
          />
        </View> 
      }
    </View>
  )
};

const actions = {
  getCommentsForComment,
  likeComment
}

const selector = createStructuredSelector({
  commentsForComment: (state, { comment }) => commentsForCommentSelector(comment.id)(state)
});

export default compose(
  React.memo,
  connect(selector, actions)
)(Comment);


