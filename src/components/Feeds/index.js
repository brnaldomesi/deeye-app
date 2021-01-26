import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import {
  getPostsList,
  getPostsListForUnsigned,
  postsListSelector
} from 'src/redux/modules/posts';

import Feed from './Feed'
import PropTypes from 'prop-types';
import { Size } from 'src/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { profileSelector } from 'src/redux/modules/auth';

const Feeds = ({
  getPostsList,
  posts,
  profile,
  footerRoute,
  unsigned,
  getPostsListForUnsigned
}) => {

  useEffect(() => {
    if(unsigned) {
      getPostsListForUnsigned();
    } else {
      getPostsList();
    }
  }, [])

  const feedsArr = footerRoute === 'missing' ? posts.filter(post => post.post_type==="MissingPerson") : posts;

  return (
    <ScrollView>
      {feedsArr && feedsArr.map(post => 
        <Feed post={post} key={post.id} profileId={profile ? profile.id : undefined} />
      )}
      <View style={{ height: Size(5.7) }} />
    </ScrollView>
  );
};

Feeds.propTypes = {
  getPostsList: PropTypes.func,
  posts: PropTypes.array,
  profile: PropTypes.object
}

const actions = {
  getPostsList,
  getPostsListForUnsigned
}

const selector = createStructuredSelector({
  posts: postsListSelector,
  profile: profileSelector
});

export default compose(
  connect(selector, actions)
)(Feeds);
