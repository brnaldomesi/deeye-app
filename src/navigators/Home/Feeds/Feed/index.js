import { Avatar, Tile } from 'react-native-elements';
import {
  Colors,
  Size,
  absolute,
  bgSecodary,
  bgTransparent,
  bgWhite,
  flexCol,
  flexOne,
  fontWeightBold,
  gradientColors,
  justifyBetween,
  m0,
  marginVerticalAuto,
  ml1,
  mt1,
  mtp5,
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
  selfCenter,
  textBase,
  textWhite,
  textXl,
  textYellow100
} from 'src/styles';
import {
  Image,
  Text,
  View
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import React, { useEffect, useState } from 'react';
import {
  likePost,
  savePost,
  sharePost
} from 'src/redux/modules/posts';

import { ASSET_BASE_URL } from 'src/config/constants';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import FastImage from 'react-native-fast-image'
import { IMAGES_PATH } from 'src/config/constants';
import LinearGradient from 'react-native-linear-gradient';
import MyButton from 'src/components/MyButton';
import PopupMenu from 'src/components/PopupMenu';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getDiffFromToday } from 'src/utils/helpers';
import moment from 'moment';
import styles from './styles';
import { tokenSelector } from 'src/redux/modules/auth';

const Feed = ({ 
  post, 
  profileId,
  savePost,
  likePost,
  sharePost 
}) => {
  const [missingCollpase, setMissingCollpase] =  useState(true);

  const postType = post.post_type;
  const missingContent = post.missing_post_content;

  const handleComment = () => {

  }

  const handleSave = () => {
    savePost({id: post.id});
  }

  const handleLike = () => {
    likePost({id: post.id})
  }

  const handleShare = () => {

  }

  const handleSend = () => {

  }

  const toggleMissingCollapse = () => {
    setMissingCollpase(missingCollpase => !missingCollpase);
  }

  return (
    <View style={[bgWhite, my1]}>
      <View style={[relative, flexOne]}>
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
      </View>
      <View style={[flexCol, styles.caption]}>
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
        <View style={p1}>
          <Text style={[primaryColor, fontWeightBold]}>Missing From: {missingContent.duo_location}</Text>
          <Text style={[primaryColor, fontWeightBold]}>Missing Since: {moment(missingContent.missing_since).format("dddd, MMMM D, YYYY")}</Text>
          <View style={[flexCol, justifyBetween, mt1]}>
            <View style={flexCol}>
              <View>
                <Text style={[textYellow100, fontWeightBold]}>Sex</Text>
                <Text>{missingContent.sex}</Text>
              </View>
              <View style={ml1}>
                <Text style={[textYellow100, fontWeightBold]}>Age</Text>
                <Text>{isNaN(moment().year() - moment(missingContent.dob).year()) ? '' : moment().year() - moment(missingContent.dob).year()} Yrs</Text>
              </View>
              <View style={ml1}>
                <Text style={[textYellow100, fontWeightBold]}>Race</Text>
                <Text>{missingContent.race}</Text>
              </View>
              <View style={ml1}>
                <Text style={[textYellow100, fontWeightBold]}>Height</Text>
                <Text>{missingContent.height_cm ? missingContent.height_cm + ' cm' : missingContent.height_ft + ' ft'}</Text>
              </View>
              <View style={ml1}>
                <Text style={[textYellow100, fontWeightBold]}>Weight</Text>
                <Text>{missingContent.weight_kg ? missingContent.weight_kg + ' kg' : missingContent.weight_lb + ' lb'}</Text>
              </View>
            </View>
            <View>
              <Button
                onPress={toggleMissingCollapse}
                buttonStyle={[bgTransparent, marginVerticalAuto]}
                icon={<AntIcon name={missingCollpase ? "downcircleo" : "upcircleo"} color={Colors.yellow100} size={25} />}
              />
            </View>
          </View>
          {!missingCollpase && 
            <View style={flexCol}>
              <View>
                <Text style={[textYellow100, fontWeightBold]}>Eye</Text>
                <Text>{missingContent.eye}</Text>
              </View>
              <View style={ml1}>
                <Text style={[textYellow100, fontWeightBold]}>Hair</Text>
                <Text>{missingContent.hair}</Text>
              </View>
              <View style={ml1}>
                <Text style={[textYellow100, fontWeightBold]}>Tattoo</Text>
                <Text>{missingContent.has_tattoo ? "Yes" : "No"}</Text>
              </View>
              <View style={ml1}>
                <Text style={[textYellow100, fontWeightBold]}>Language</Text>
                <Text>{missingContent.language}</Text>
              </View>
            </View>
          }
          <Divider style={styles.divider} />
          <View>
            <Text style={[textXl, primaryColor]}>Circumstances</Text>
            <View style={mtp5}>
              <Text>{missingContent.circumstance}</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={[flexCol, justifyBetween]}>
            <View>
              <Text style={[textXl, primaryColor]}>Contact</Text>
              <Text>If you have any information about{"\n"}the whomabout of {missingContent.fullname}</Text>
            </View>
            <View style={flexCol}>
              <View>
                <Image style={[styles.contactImg, selfCenter]} source={IMAGES_PATH.phoneCall} />
                <View style={mtp5}>
                  <Text>Call</Text>
                </View>
              </View>
              <View style={ml1}>
                <Image style={[styles.contactImg, selfCenter]} source={IMAGES_PATH.openChat} />
                <View style={mtp5}>
                  <Text>Message</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      }
      <Divider style={styles.divider} />
      <View style={styles.footer}>
        <View>
          <MyButton onPress={handleComment}>
            <Image style={styles.commentImg} source={IMAGES_PATH.comment} />
            <Text>Comment</Text>
          </MyButton>
        </View>
        <View>
          <MyButton onPress={handleSave}>
            <Image style={styles.saveImg} source={post.saved ? IMAGES_PATH.save1 : IMAGES_PATH.save} />
            <Text>Save</Text>
          </MyButton>
        </View>
        <View>
          <MyButton onPress={handleLike}>
            <Image style={styles.suppportImg} source={post.liked ? IMAGES_PATH.support1 : IMAGES_PATH.support} />
            <Text>Support</Text>
          </MyButton>
        </View>
        <View>
          <MyButton onPress={handleShare}>
            <Image style={styles.shareImg} source={IMAGES_PATH.share} />
            <Text>Share</Text>
          </MyButton>
        </View>
        <View>
          <MyButton onPress={handleSend}>
            <Image style={styles.sendImg} source={IMAGES_PATH.send} />
            <Text>Send</Text>
          </MyButton>
        </View>
      </View>
    </View>
  );
};

Feed.propTypes = {
  profileId: PropTypes.number.isRequired
}

const actions = {
  savePost,
  likePost,
  sharePost
}

export default compose(
  connect(null, actions)
)(Feed);
