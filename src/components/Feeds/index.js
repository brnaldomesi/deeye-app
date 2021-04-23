import { ScrollView, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import {
  getPostsList,
  getPostsListForUnsigned,
  postsListSelector
} from 'src/redux/modules/posts';
import Feed from './Feed'
import PropTypes from 'prop-types';
import Search from '../Search/index';
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
  getPostsListForUnsigned,
}) => {

  const [count, setCount] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [scroll, setScroll] = React.useState(0);
  const [type, setType] = React.useState(footerRoute === 'missing'? 0 : 1);

  useEffect(() => {
    let unmounted = true;

    if (isLoading) {
      return;
    }

    if(unsigned) {
      getPostsListForUnsigned(
        {params: {type: type, page: page, count: count}}
      );
    } else {
      getPostsList(
        {params: {type: type, page: page, count: count},
          success: (res) => {
            if (unmounted) {
              setPage(page + 1);
              setIsLoading(res.data.length === 0);
            }
          }}
      );
    }

    return () => { unmounted = false };
  }, [scroll]);

  const list = useMemo(() => {
    return posts && posts.map((post, index) => {
        return typeof post === 'undefined'
          ? <></>
          : <Feed post={post} key={index}
                  profileId={profile ? profile.id : 'undefined'}
                  isShare={true} />
      }
    )
  }, [posts]);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const handleOffset = () => {
    setScroll(scroll + 1);
  };

  return (
    <ScrollView
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          handleOffset();
        }
      }}
      scrollEventThrottle={400}>
      <View style={{ height: Size(4), marginTop: 10}}>
        <Search/>
      </View>
      {list}
      <View style={{ height: Size(6)}}/>
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
