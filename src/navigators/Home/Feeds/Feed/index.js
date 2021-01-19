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
  m0,
  mt1,
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
import {Button} from 'react-native-elements';
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
  const sourceType = postType === 'Share' ? post.post_source.post_type : postType
  const missingContent = postType === 'Share' ? post.post_source.missing_post_content : post.missing_post_content;
  const authorName = postType === 'Share' ? post.post_source.author.first_name + ' ' + post.post_source.author.last_name : post.author.first_name + ' ' + post.author.last_name;
  const postAttachment = postType === 'Share' ? post.post_source.post_attachments[0] : post.post_attachments[0];
  const uri = postAttachment ? ASSET_BASE_URL + postAttachment.path : undefined;
  const updatedAt = postType === 'Share' ? post.post_source.updated_at : post.updated_at;
  const description = postType === 'Share' ? post.post_source.description : post.description;

  const navigatePostDetail = () => {
    RootNavigation.navigate('PostDetail', {post: postType === 'Share' ? post.post_source : post});
  }

  const toggleMissingCollapse = () => {
    setMissingCollpase(missingCollpase => !missingCollpase);
  }

  return (
    <View style={[bgWhite, my1]}>
      {postType === 'Share' && 
        <View style={p1}>
          <Button 
            type="clear" 
            title="Shared by" 
            disabled
            buttonStyle={[p0, m0, styles.sharedby]}
          />
          <View style={flexRow}>
            <Avatar
              rounded
              icon={{name: 'user', type: 'font-awesome', color: 'black'}}
            />
            <View>
              <Text style={[primaryColor, fontWeightBold]}>{post.author.first_name + ' ' + post.author.last_name}</Text>
              <Text>{getDiffFromToday(post.updated_at)}</Text>
              <Text style={mt1}>{post.description}</Text>
            </View>
          </View>
        </View>
      }
      <View style={[relative, flexOne]}>
        <TouchableOpacity onPress={navigatePostDetail}>
          {sourceType === "Video" ? (
            <VideoPlayer 
              source={{uri}} 
              style={[styles.thumbnail, resizeCover]}
              paused={true} 
              disableBack
              disableFullscreen
            />
          ) : (
            <>
              <FastImage
                style={styles.thumbnail}
                source={{uri}}
                resizeMode={FastImage.resizeMode.cover}
              />
              {sourceType === 'MissingPerson' && 
                <>
                  <Image style={[styles.badge, resizeContain, absolute]} source={IMAGES_PATH.verifiedBadge} />
                  <LinearGradient 
                    colors={gradientColors} 
                    style={[absolute, styles.missingDays]}
                    start={{x:0, y:0}}
                    end={{x:1, y: 0}}
                  >
                    <Text style={textWhite}>{'Missing ' + getDiffFromToday(updatedAt) + ' Now'}</Text>
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
          <Text style={[primaryColor, fontWeightBold]}>{authorName}</Text>
          <Text>{getDiffFromToday(updatedAt)}</Text>
        </View>
        <View style={[flexOne, px1]}>
          {sourceType === 'MissingPerson' ? (
            <>
              <Text style={[textXl, fontWeightBold, primaryColor]}>{missingContent.fullname}</Text>
              <Text>AKA {missingContent.aka}</Text>
            </>
          ) : (
            <Text>{description}</Text>
          )} 
        </View>
        <View>
          <PopupMenu post={post} isMyPost={post.profile_id === profileId} />
        </View>
      </View>
      {sourceType === 'MissingPerson' && 
        <MissingDetailInfo 
          missingContent={missingContent} 
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
