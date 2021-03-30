import * as RootNavigation from 'src/navigators/Ref';

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
  justifyBetween,
  m0,
  mlp5,
  mt1,
  mtp5,
  my1,
  p0,
  p1,
  pl1,
  primaryColor,
  px1,
  py1,
  relative,
  resizeContain,
  roundedFull,
  textBase,
  textWhite,
  textXl,
  textYellow100
} from 'src/styles';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ASSET_BASE_URL} from 'src/config/apipath';
import ActionFooter from 'src/components/ActionFooter';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-elements';
import CommentsHistoryInfoForPost from 'src/components/CommentsHistoryInfoForPost';
import {Divider} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {IMAGES_PATH} from 'src/config/constants';
import LinearGradient from 'react-native-linear-gradient';
import MissingDetailInfo from 'src/components/MissingDetailInfo'
import PopupMenu from 'src/components/PopupMenu';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getDiffFromToday} from 'src/utils/helpers';
import {setFollow} from "../../../redux/modules/follow";
import styles from './styles';

const Feed = ({
                post,
                profileId,
                commentsShow,
                setCommentPosterInfo,
                isShare,
                setFollow,
              }) => {

  const [missingCollpase, setMissingCollpase] = useState(true);
  const [thumbsize, setThumbsize] = useState({width: Dimensions.get('window').width, height: Size(13)});

  const postType = post.post_type;
  const sourceType = postType === 'Share' ? post.post_source.post_type : postType
  const missingContent = postType === 'Share' ? post.post_source.missing_post_content : post.missing_post_content;
  const authorName = postType === 'Share' ? (post.post_source.author.first_name + ' ' + post.post_source.author.last_name) : (post.author.first_name + ' ' + post.author.last_name);
  const postAttachment = postType === 'Share' ? post.post_source.post_attachments[0] : post.post_attachments[0];
  const uri = postAttachment ? ASSET_BASE_URL + postAttachment.path : undefined;
  const updatedAt = postType === 'Share' ? post.post_source.updated_at : post.updated_at;
  const description = postType === 'Share' ? post.post_source.description : post.description;
  const avatarPath = postType === 'Share' ? ASSET_BASE_URL + post.post_source.author.avatar_path : ASSET_BASE_URL + post.author.avatar_path;

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
        setThumbsize({width, height});
      }, (error) => {
        console.error(error)
      });
    }
  }, [uri])

  const navigatePostDetail = id => () => {
    RootNavigation.navigate('PostDetail', {id});
  }

  const toggleMissingCollapse = () => {
    setMissingCollpase(missingCollpase => !missingCollpase);
  }

  const handleFollow = () => {
    if (postType !== 'Share') {
      setFollow({
        isPin: false,
        isFollow: false,
        follower_id: post.author.user_id,
        data: {
          user_id: post.author.user_id,
          type: post.follow_state === 1 ? 'unfollow' : 'follow'
        }
      });
    }
  }

  const imgFollow = function (type) {
    return {
      width: Size(.7),
      height: Size(.7),
      resizeMode: 'contain',
    }
  };

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
        <View style={[flexRow, mtp5]}>
          <Avatar
            rounded
            source={{uri: ASSET_BASE_URL + post.author.avatar_path}}
          />
          <View style={[mlp5, flexOne]}>
            <TouchableOpacity onPress={navigatePostDetail(post.id)}>
              <Text style={[primaryColor, fontWeightBold]}>{post.author.first_name + ' ' + post.author.last_name}</Text>
              <Text>{getDiffFromToday(post.updated_at)}</Text>
              <Text style={mt1}>{post.description}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      }
      <View style={relative}>
        {sourceType === "Video" ? (
          <VideoPlayer
            source={{uri}}
            style={[styles.thumbnail, resizeContain]}
            paused={true}
            disableBack
            disableFullscreen
          />
        ) : (
          <TouchableOpacity onPress={navigatePostDetail(postType === 'Share' ? post.post_source.id : post.id)}>
            <FastImage
              style={{
                width: Dimensions.get('window').width,
                height: thumbsize.height * Dimensions.get('window').width / thumbsize.width
              }}
              source={{uri}}
              resizeMode={FastImage.resizeMode.contain}
            />
            {sourceType === 'MissingPerson' &&
            <>
              <Image style={[styles.badge, resizeContain, absolute]} source={IMAGES_PATH.verifiedBadge}/>
              <LinearGradient
                colors={gradientColors}
                style={[absolute, styles.missingDays]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
              >
                <Text style={textWhite}>{'Missing ' + getDiffFromToday(missingContent.missing_since) + ' Now'}</Text>
              </LinearGradient>
            </>
            }
          </TouchableOpacity>
        )}
      </View>
      <View style={p1}>
        <View style={[flexRow, justifyBetween]}>
          <View style={flexRow}>
            <Avatar
              rounded
              source={{uri: avatarPath}}
            />
            <View style={pl1}>
              <Text style={[primaryColor, fontWeightBold]}>{authorName}</Text>
              <Text>{getDiffFromToday(updatedAt)}</Text>
            </View>
          </View>
          {post.profile_id !== profileId && <TouchableOpacity onPress={handleFollow}>
            <Text style={styles.btnFollow}>
              <Image style={imgFollow('ok')} source={IMAGES_PATH.search}/>
              {' '}{post.follow_state === 0 ? 'follow' : 'following'}</Text>
          </TouchableOpacity>}
          <View>
            <PopupMenu post={post} isMyPost={post.profile_id === profileId}/>
          </View>
        </View>
        <View style={[pl1, mtp5]}>
          {sourceType === 'MissingPerson' ? (
            <>
              <Text style={[textXl, fontWeightBold, primaryColor]}>{missingContent.fullname}</Text>
              <Text>AKA {missingContent.aka}</Text>
            </>
          ) : (
            <Text>{description}</Text>
          )}
        </View>
        {sourceType === 'MissingPerson' &&
        <MissingDetailInfo
          missingContent={missingContent}
          missingCollpase={missingCollpase}
          onPress={toggleMissingCollapse}
          style={p1}
        />
        }
        <Divider style={styles.divider}/>
        <View style={mtp5}>
          <CommentsHistoryInfoForPost post={post}/>
        </View>
      </View>


      {isShare && <ActionFooter style={styles.footer} post={post} isShare={isShare}/>}
    </View>
  );
};

Feed.propTypes = {
  profileId: PropTypes.number
}

const actions = {
  setFollow
}

export default compose(
  connect(null, actions)
)(Feed);
