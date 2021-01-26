import React, { useCallback } from 'react';
import { getUserPostsList, userPostsListSelector } from 'src/redux/modules/profiles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Feed from 'src/components/Feeds/Feed'
import PropTypes from 'prop-types';
import { Size } from 'src/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { profileSelector } from 'src/redux/modules/auth';
import { useFocusEffect } from '@react-navigation/native';

const Posts = ({
  getUserPostsList,
  userPosts,
  profile
}) => {
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('profile').then(profile => getUserPostsList({id: JSON.parse(profile).id}));
    }, [userPosts])
  );

  return (
    <>
      {userPosts && userPosts.map(post => 
        <Feed post={post} key={post.id} profileId={profile.id} />
      )}
    </>
  );
};

Posts.propTypes = {
  getUserPostsList: PropTypes.func,
  userPosts: PropTypes.array,
}

const actions = {
  getUserPostsList
}

const selector = createStructuredSelector({
  userPosts: userPostsListSelector,
  profile: profileSelector
});

export default compose(
  connect(selector, actions)
)(Posts);
