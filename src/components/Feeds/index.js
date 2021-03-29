import { Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  getPostsList,
  getPostsListForUnsigned,
  postsListSelector
} from 'src/redux/modules/posts';

import Feed from './Feed'
import { IMAGES_PATH } from 'src/config/constants';
import PropTypes from 'prop-types';
import Search from '../Search/index';
import { Size } from 'src/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { profileSelector } from 'src/redux/modules/auth';
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
      <View style={{ height: Size(5.7), marginTop: 10, marginBottom: 0 }}>
        <Search></Search>
      </View>
      {feedsArr && feedsArr.map(post =>
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
