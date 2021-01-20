import {
  ScrollView,
  Text,
  View
} from 'react-native';

import Posts from './Posts';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { p1 } from 'src/styles';

const Profile = ({navigation}) => {
  return (
    <ScrollView>
      <View style={p1}>
        <Text>My Posts</Text>
      </View>
      <Posts />
    </ScrollView>
  )
};

Profile.propTypes = {
}

const actions = {
}

// const selector = createStructuredSelector({
// });

export default compose(
  connect(null, actions)
)(Profile);
