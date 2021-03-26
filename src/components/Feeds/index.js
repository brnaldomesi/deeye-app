import React, { useEffect } from 'react';
import { ScrollView, View, Text, SafeAreaView, Image, TextInput } from 'react-native';
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
import Search from '../Search/index';
import { IMAGES_PATH } from 'src/config/constants';
import styles from './Feed/styles';

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
  }, []);

  const feedsArr = footerRoute === 'missing' ? posts.filter(post => post.post_type==="MissingPerson") : posts;

  return (
    <ScrollView>
      <View style={{ height: Size(5.7), marginTop: 10, marginBottom: -5 }}>
        <Search/>
      </View>
      {posts && feedsArr.map(post =>
        <Feed post={post} key={post.id} profileId={profile ? profile.id : undefined} isShare={true} />
      )}
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
