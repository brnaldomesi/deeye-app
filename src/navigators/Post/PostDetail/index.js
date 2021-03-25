import {
  Image,
  Text,
  View
} from 'react-native';
import React, { useState } from 'react';
import {
  absolute,
  bgBlack,
  bgTransparent,
  bgWhite,
  flexGrowOne,
  flexOne,
  flexRow,
  fontWeightBold,
  itemsStart,
  justifyAround,
  opacity40,
  p1,
  relative,
  resizeContain,
  resizeCover,
  selfCenter,
  textWhite,
  textXl
} from 'src/styles';

import { ASSET_BASE_URL } from 'src/config/apipath';
import ActionFooter from 'src/components/ActionFooter';
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { IMAGES_PATH } from 'src/config/constants';
import MissingDetailInfo from 'src/components/MissingDetailInfo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getDiffFromToday } from 'src/utils/helpers';
import { postSelector } from 'src/redux/modules/posts';
import styles from './styles';

const PostDetail = ({
  route, 
  navigation,
  post
}) => {
  const goBack = () => navigation.goBack();
  const postType = post.post_type;
  const postContent = postType === 'Share' ? post.post_source : post;
  const bgImageUrl = postContent.post_attachments[0] ? ASSET_BASE_URL + postContent.post_attachments[0].path : undefined;
  const name = postContent.post_type === 'MissingPerson' ? postContent.missing_post_content.fullname : ' ';
  const aka = postContent.post_type === 'MissingPerson' ? 'AKA '+ postContent.missing_post_content.aka : ' ';
  const missingContent = postContent.missing_post_content;

  const [missingCollpase, setMissingCollpase] = useState(true);

  const toggleMissingCollapse = () => {
    setMissingCollpase(missingCollpase => !missingCollpase);
  }

  return (
    <View style={[flexOne, bgBlack, relative]}>
      <View style={[p1, relative]}>
        <View style={[absolute, styles.backView]}>
          <Button
            onPress={goBack}
            buttonStyle={bgTransparent}
            icon={<Image style={[styles.backImg, resizeCover]} source={IMAGES_PATH.arrowLeft} />}
          />
        </View>
        {postType === 'Share' && 
          <Text style={[selfCenter, textWhite]}>{post.author.first_name + ' ' + post.author.last_name + ' shared'}</Text>
        }
        <Text style={[selfCenter, textWhite, textXl, fontWeightBold]}>{name}</Text>
        <Text style={[selfCenter, textWhite]}>{aka}</Text>
      </View>
      <View style={[flexOne, relative]}>
        <FastImage
          style={[flexOne, !missingCollpase ? opacity40 : undefined]}
          source={{uri: bgImageUrl}}
          resizeMode={FastImage.resizeMode.contain}
        />
        {postContent.post_type === 'MissingPerson' && 
          <>
            <Image style={[styles.badge, resizeContain, absolute]} source={IMAGES_PATH.verifiedBadge} />
            <View style={[absolute, styles.missing, bgWhite]}>
              <Text>{'Missing ' + getDiffFromToday(postContent.missing_post_content.missing_since) + ' Now'}</Text> 
            </View>
          </>
        }
      </View>
      {!missingCollpase && 
        <View style={[bgBlack, styles.bottom]} />   
      }
      <View style={[missingCollpase ? relative : [absolute, styles.footer], p1]}>
        {postContent.post_type === 'MissingPerson' ? (
          <MissingDetailInfo 
            missingContent={postContent.missing_post_content} 
            missingCollpase={missingCollpase}
            onPress={toggleMissingCollapse}
            fromDetail 
          />
        ) : (
          <Text style={[selfCenter, textWhite]}>{postContent.description}</Text>
        )}
        <Divider style={styles.divider} />
        <ActionFooter style={[justifyAround, flexRow, bgBlack]} post={post} fromDetail />
      </View>
    </View>
  );
};

const selector = createStructuredSelector({
  post: (state, { route: { params: { id }}}) => postSelector(id)(state)
});

export default compose(
  connect(selector, null)
)(PostDetail);
