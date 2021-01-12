import PostForm from 'src/navigators/Post/components/PostForm';
import React from 'react';
import { View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updatePost } from 'src/redux/modules/posts';

const PostEdit = ({
  route,
  updatePost
}) => {
  const { post } = route.params;

  const handleSubmit = data => {
    updatePost({
      id: post.id,
      data: {description: data.description},
    });
  }
  
  return (
    <View>
      <PostForm post={post} onSubmit={handleSubmit} />
    </View>
  )
}

const actions = {
  updatePost
}

export default compose(
  connect(null, actions)
)(PostEdit);

