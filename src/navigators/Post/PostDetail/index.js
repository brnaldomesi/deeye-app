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
  p1,
  relative,
  resizeContain,
  resizeCover,
  selfCenter,
  textWhite,
  textXl
} from 'src/styles';

import { ASSET_BASE_URL } from 'src/config/constants';
import ActionFooter from 'src/components/ActionFooter';
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { IMAGES_PATH } from 'src/config/constants';
import MissingDetailInfo from 'src/components/MissingDetailInfo';
import { getDiffFromToday } from 'src/utils/helpers';
import styles from './styles';

const PostDetail = ({route, navigation}) => {
  const { post } = route.params;
  const goBack = () => navigation.goBack();
  const bgImageUrl = post.post_attachments[0] ? ASSET_BASE_URL + post.post_attachments[0].path : undefined;
  const postType = post.post_type;
  const name = postType === 'MissingPerson' ? post.missing_post_content.fullname : ' ';
  const aka = postType === 'MissingPerson' ? 'AKA '+ post.missing_post_content.aka : ' ';
  const missingContent = post.missing_post_content;

  const [missingCollpase, setMissingCollpase] =  useState(true);

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
        <Text style={[selfCenter, textWhite, textXl, fontWeightBold]}>{name}</Text>
        <Text style={[selfCenter, textWhite]}>{aka}</Text>
      </View>
      <View style={[flexOne, relative]}>
        <FastImage
          style={flexOne}
          source={{uri: bgImageUrl}}
          resizeMode={FastImage.resizeMode.stretch}
        />
        {postType === 'MissingPerson' && 
          <>
            <Image style={[styles.badge, resizeContain, absolute]} source={IMAGES_PATH.verifiedBadge} />
            <View style={[absolute, styles.missing, bgWhite]}>
              <Text>{'Missing ' + getDiffFromToday(post.updated_at) + ' Now'}</Text> 
            </View>
          </>
        }
      </View>
      {!missingCollpase && 
        <View style={[bgBlack, styles.bottom]} />   
      }
      <View style={[missingCollpase ? relative : [absolute, styles.footer], p1]}>
        {postType === 'MissingPerson' ? (
          <MissingDetailInfo 
            post={post} 
            missingCollpase={missingCollpase}
            onPress={toggleMissingCollapse}
            fromDetail 
          />
        ) : (
          <Text style={[selfCenter, textWhite]}>{post.description}</Text>
        )}
        <Divider style={styles.divider} />
        <ActionFooter style={[justifyAround, flexRow, bgBlack]} post={post} fromDetail />
      </View>
    </View>
  );
};

export default PostDetail;
