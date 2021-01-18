import * as RootNavigation from 'src/navigators/Ref';

import { Avatar, Tile } from 'react-native-elements';
import {
  Colors,
  Size,
  absolute,
  bgSecodary,
  bgWhite,
  flexOne,
  flexRow,
  fontWeightBold,
  gradientColors,
  my1,
  p0,
  p1,
  primaryColor,
  px1,
  py1,
  relative,
  resizeContain,
  resizeCover,
  roundedFull,
  textBase,
  textWhite,
  textXl,
  textYellow100
} from 'src/styles';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import React, { useEffect, useState } from 'react';

import { ASSET_BASE_URL } from 'src/config/constants';
import ActionFooter from 'src/components/ActionFooter';
import { Divider } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { IMAGES_PATH } from 'src/config/constants';
import LinearGradient from 'react-native-linear-gradient';
import MissingDetailInfo from 'src/components/MissingDetailInfo'
import PopupMenu from 'src/components/PopupMenu';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getDiffFromToday } from 'src/utils/helpers';
import styles from './styles';
import { tokenSelector } from 'src/redux/modules/auth';

const Feed = ({ 
  post, 
  profileId
}) => {
  const [missingCollpase, setMissingCollpase] =  useState(true);

  const postType = post.post_type;
  const missingContent = post.missing_post_content;

  const navigatePostDetail = () => {
    RootNavigation.navigate('PostDetail', {post});
  }

  const toggleMissingCollapse = () => {
    setMissingCollpase(missingCollpase => !missingCollpase);
  }

  return (
    <View style={[bgWhite, my1]}>
      <View style={[relative, flexOne]}>
        <TouchableOpacity onPress={navigatePostDetail}>
          {postType === "Video" ? (
            <VideoPlayer 
              source={{ uri: post.post_attachments[0] ? ASSET_BASE_URL + post.post_attachments[0].path : undefined }} 
              style={[styles.thumbnail, resizeCover]}
              paused={true} 
              disableBack
              disableFullscreen
            />
          ) : (
            <>
              <FastImage
                style={styles.thumbnail}
                source={{
                  uri: post.post_attachments[0] ? ASSET_BASE_URL + post.post_attachments[0].path : undefined
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              {postType === 'MissingPerson' && 
                <>
                  <Image style={[styles.badge, resizeContain, absolute]} source={IMAGES_PATH.verifiedBadge} />
                  <LinearGradient 
                    colors={gradientColors} 
                    style={[absolute, styles.missingDays]}
                    start={{x:0, y:0}}
                    end={{x:1, y: 0}}
                  >
                    <Text style={textWhite}>{'Missing ' + getDiffFromToday(post.updated_at) + ' Now'}</Text>
                  </LinearGradient>
                </>
              }
            </>
          )}
        </TouchableOpacity>
      </View>
      <View style={[flexRow, styles.caption]}>
        <View>
          <Avatar
            rounded
            icon={{name: 'user', type: 'font-awesome', color: 'black'}}
          />
          <Text style={[primaryColor, fontWeightBold]}>{post.author.first_name + ' ' + post.author.last_name}</Text>
          <Text>{getDiffFromToday(post.updated_at)}</Text>
        </View>
        <View style={[flexOne, px1]}>
          {postType === 'MissingPerson' ? (
            <>
              <Text style={[textXl, fontWeightBold, primaryColor]}>{missingContent.fullname}</Text>
              <Text>AKA {missingContent.aka}</Text>
            </>
          ) : (
            <Text>{post.description}</Text>
          )} 
        </View>
        <View>
          <PopupMenu post={post} isMyPost={post.profile_id === profileId} />
        </View>
      </View>
      {postType === 'MissingPerson' && 
        <MissingDetailInfo 
          post={post} 
          missingCollpase={missingCollpase}
          onPress={toggleMissingCollapse}
          style={p1}
        />
      }
      <ActionFooter style={styles.footer} post={post} />
    </View>
  );
};

Feed.propTypes = {
  profileId: PropTypes.number
}

export default compose(
  connect(null, null)
)(Feed);
