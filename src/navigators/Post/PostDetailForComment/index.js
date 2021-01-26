import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import {
  Size,
  absolute,
  bgBottomPrimary,
  bgSecodary,
  bgTransparent,
  bgWhite,
  bottom0,
  flexOne,
  flexRow,
  left0,
  myAuto,
  pp5,
  primaryColor,
  px1,
  relative,
  right0
} from 'src/styles';
import {
  commentsListSelector,
  createCommentForComment,
  createCommentForPost,
} from 'src/redux/modules/comments';

import { ASSET_BASE_URL } from 'src/config/constants';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Comments from 'src/components/Comments'
import Feed from 'src/components/Feeds/Feed';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPost } from 'src/redux/modules/posts';
import { postSelector } from 'src/redux/modules/posts';
import { profileSelector } from 'src/redux/modules/auth';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const PostDetailForComment = ({
  route,
  navigation, 
  profile,
  createCommentForPost,
  createCommentForComment,
  getPost,
  comments,
  post
}) => {
  const [commentText, setCommentText] = useState('');
  const [commentPosterInfo, setCommentPosterInfo] = useState({id: 0, name: ''});
  const commentTextInputRef = useRef(null);
  
  useFocusEffect(useCallback(
    () => {
      getPost({id: route.params.id});
    }, [])
  );

  const handleReply = arg => {
    setCommentPosterInfo(arg);
    commentTextInputRef.current.focus();
  }

  const leaveComment = () => {
    if(commentPosterInfo.id === 0) {
      createCommentForPost({
        id: post.id,
        data: {
          text: commentText
        }
      })
    } else {
      createCommentForComment({
        id: commentPosterInfo.id,
        data: {
          text: commentText
        }
      })
    }
    setCommentText('');
    setCommentPosterInfo({id: 0, name: ''});
  }

  return (
    <View style={[relative, flexOne]}>
      <ScrollView>
        <Feed 
          post={post} 
          profileId={profile ? profile.id : undefined} 
        />
        {comments && comments.length > 0 && 
          <View style={px1}>
            <Text>Comments</Text>
            <Comments 
              comments={comments} 
              setCommentPosterInfo={handleReply}
              isParentPost 
            />
          </View>
        }
        <View style={{ height: Size(4.3) }} />
      </ScrollView>
      <View style={[absolute, bottom0, pp5, left0, right0, bgWhite, styles.submitComment]}>
        {commentPosterInfo.id !== 0 && 
          <View>
            <Text>Replying to {commentPosterInfo.name}</Text>
          </View>
        }
        <View style={[flexRow]}>
          {profile && 
            <View style={myAuto}>
              <Avatar
                rounded
                source={{uri: ASSET_BASE_URL + profile.avatar_path}}
              />
            </View>
          }
          <TextInput
            autoFocus
            ref={commentTextInputRef}
            placeholder="Leave a comment to help" 
            style={[flexOne, styles.commentInput]}
            value={commentText}
            onChangeText={setCommentText}
          />
          <Button 
            onPress={leaveComment} 
            title="Post" 
            buttonStyle={[bgTransparent, myAuto]}
            titleStyle={primaryColor}
          />
        </View>
      </View>
    </View>
  );
};

const actions = {
  createCommentForPost,
  createCommentForComment,
  getPost
}

const selector = createStructuredSelector({
  profile: profileSelector,
  comments: commentsListSelector,
  post: (state, {route}) => postSelector(route.params.id)(state)
});

export default compose(
  connect(selector, actions)
)(PostDetailForComment);
