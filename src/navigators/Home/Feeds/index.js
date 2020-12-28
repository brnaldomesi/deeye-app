import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { getPostsList, postsListSelector } from 'src/redux/modules/posts';

import Feed from './Feed'
import PropTypes from 'prop-types';
import { Size } from 'src/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles';

const Feeds = ({
  getPostsList,
  posts
}) => {
  
  useEffect(() => {
    getPostsList();
  }, [])

  return (
    <ScrollView>
      {posts && posts.map( (post, index) => 
        <Feed post={post} key={index} />
      )}
      <View style={{ height: Size(5.7) }} />
    </ScrollView>
  );
};

Feeds.propTypes = {
  getPostsList: PropTypes.func,
  posts: PropTypes.array,
  token: PropTypes.string
}

const actions = {
  getPostsList
}

const selector = createStructuredSelector({
  posts: postsListSelector
});

export default compose(
  connect(selector, actions)
)(Feeds);
