import * as RootNavigation from 'src/navigators/Ref';

import {
  Size,
  absolute,
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
  relative,
  resizeContain,
  textWhite,
  textXl,
  textXX,
  d_flex,
  textDot7,
  bgSecodary
} from 'src/styles';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';

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
import PopupSheet from 'src/components/PopupSheet';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getDiffFromToday} from 'src/utils/helpers';
import {setFollow} from "../../../redux/modules/follow";
import styles from './styles';
import LinkPreview from "react-native-link-preview";
import * as gStyle from "../../../styles";
import { ml1 } from '../../../styles';

const Feed = ({
                post,
                profileId,
                commentsShow,
                setCommentPosterInfo,
                isShare,
                setFollow,
              }) => {

  const postType = post.post_type;
  const sourceType = postType === 'Share' ? post.post_source.post_type : postType
  const missingContent = postType === 'Share' ? post.post_source.missing_post_content : post.missing_post_content;
  const authorName = postType === 'Share' ? (post.post_source.author.first_name + ' ' + post.post_source.author.last_name) : (post.author.first_name + ' ' + post.author.last_name);
  const postAttachment = postType === 'Share' ? post.post_source.post_attachments[0] : post.post_attachments[0];
  const uri = postAttachment ? ASSET_BASE_URL + postAttachment.path : undefined;
  const updatedAt = postType === 'Share' ? post.post_source.updated_at : post.updated_at;
  const description = postType === 'Share' ? post.post_source.description : post.description;
  const link = postType === 'Share' ? post.post_source.link : post.link;
  const avatarPath = postType === 'Share' ? ASSET_BASE_URL + post.post_source.author.avatar_path : ASSET_BASE_URL + post.author.avatar_path;

  //parse
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [missingCollpase, setMissingCollpase] = useState(true);
  const [thumbsize, setThumbsize] = useState({width: Dimensions.get('window').width, height: Size(13)});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let unmounted = true;

    if (unmounted) {
      if (uri) {
        Image.getSize(uri, (width, height) => {
          setThumbsize({width, height});
        }, (error) => {
          console.log('Image getSize', error)
        });
      }
    }

    return () => { unmounted = false };

  }, [uri])

  useMemo(() => {
    if (link !== '' || link !== undefined) {
      LinkPreview.getPreview(link).then(data => {
        setIsLoading(true);
        switch (data.mediaType) {
          case 'website':
            setTitle(data.title);
            setThumbnail(data.images.length !== 0 ? data.images[0] : null);
            setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
            break;
          case 'video.other':
            setTitle(data.title);
            setThumbnail(data.images.length !== 0 ? data.images[0] : null);
            setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
            break;
          case 'image':
            setTitle('Image');
            setThumbnail(data.url);
            setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
            break;
          case 'audio':
            setTitle('Audio');
            setThumbnail(null);
            setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
            break;
          case 'video':
            // setIsVideo(true);
            setTitle('Video');
            setThumbnail(null);
            setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
            break;
          case 'application':
            setTitle('Application');
            setThumbnail(null);
            setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
            break;
          case 'article':
            setTitle(data.title);
            setThumbnail(data.images.length !== 0 ? data.images[0] : null);
            setIcon(data.favicons.length !== 0 ? data.favicons[0] : null);
            break;
          default:
            setTitle('');
            setThumbnail(null);
            setIcon(null);
            break;
        }
      });
    }

    return '';
  }, [link]);

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
      {(postType !== 'link' && postType !== 'text') && <View style={relative}>
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
      </View>}
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
          {post.profile_id !== profileId &&
          <Button
            title={post.follow_state === 0 ? 'follow' : 'following'}
            type="outline"
            buttonStyle={[styles.btnFollow, bgSecodary]}
            titleStyle={[textDot7]}
            icon={<Image style={styles.followIcon} source={post.follow_state === 0 ? IMAGES_PATH.follow : IMAGES_PATH.unfollow}/>}
            onPress={handleFollow}
          />
          }
          <View>
            <PopupSheet post={post} isMyPost={post.profile_id === profileId} isShare={isShare}/>
          </View>
        </View>
        <View style={[mtp5]}>
          {sourceType === 'MissingPerson' ? (
            <>
              <Text style={[textXX, fontWeightBold, primaryColor, ml1]}>{missingContent.fullname}</Text>
              <Text style={ml1}>AKA {missingContent.aka}</Text>
            </>
          ) : (
            postType !== 'link' ? <Text style={ml1}>{description}</Text> :
              <TouchableOpacity onPress={() => {
                Linking.openURL(link);
              }
              }>
                <Text>{link}</Text>
                {!isLoading ? <View style={[gStyle.justifyCenter, gStyle.flexOne, {height: Size(15)}]}>
                  <ActivityIndicator color={'#0000ff'}/>
                </View> : <View style={{marginTop: 10, marginBottom: 10}}>
                  <View>
                    {isVideo ? <VideoPlayer source={{uri: link}} style={{width: '100%', height: Size(15)}}/> :
                      <Image style={{width: '100%', height: Size(15), resizeMode: 'contain'}}
                             source={{uri: thumbnail}}/>}
                    <View style={d_flex}>
                      <Image style={{width: Size(1), height: Size(1), resizeMode: 'contain'}} source={{uri: icon}}/>
                      <Text>{' '}{title}</Text>
                    </View>
                  </View>
                </View>}
              </TouchableOpacity>
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

const actions = {
  setFollow
}

export default compose(
  connect(null, actions)
)(Feed);
