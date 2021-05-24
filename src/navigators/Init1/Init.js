/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as RootNavigation from 'src/navigators/Ref';
import * as gStyle from 'src/styles'

import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import React, {useCallback, useState, useEffect} from 'react';

import {IMAGES_PATH} from "../../config/constants";
import {Size} from "../../styles";
import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {isAuthenticatedSelector} from "../../redux/modules/auth";
import styles from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {ASSET_BASE_URL} from "../../config/apipath";
import FastImage from "react-native-fast-image";
import moment from "moment";

const Init = ({route, isAuthenticated}) => {

  const [thumbsize, setThumbsize] = useState({width: Dimensions.get('window').width, height: Size(20)});
  const [avatarPath, setAvatarPath] = useState(null);
  const [time, setTime] = useState(5);
  let i = 0;

  const missingContent = route.params.data.missing_post_content;
  const postAttachment = route.params.data.post_attachments[0];
  const uri = postAttachment ? ASSET_BASE_URL + postAttachment.path : undefined;

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
        setThumbsize({width, height});
      }, (error) => {
        console.log('Image getSize', error)
      });
    }
  }, [uri])

  const handleNext = () => {
    RootNavigation.navigateAndSimpleReset(isAuthenticated ? 'Drawer' : 'OnBoarding');
  };

  console.log("missing", missingContent);

  return (
    <ScrollView>
    <View style={gStyle.flexOne}>
      <View style={styles.header}>
        <View style={gStyle.d_flex}>
        </View>
        <View style={styles.mb1}>
          <Text style={styles.headerTitle}>M I S S I N G</Text>
          <Text style={styles.headerUnderTitle}>{missingContent.missing_type}</Text>
        </View>
      </View>
      
      <View style={styles.top_tap}>
        <Text style={styles.top_description}>Get Deeye App Now</Text>
        <Image style={styles.top_arrow} source={IMAGES_PATH.arrow}/>
        <Image style={styles.top_img1} source={IMAGES_PATH.image1}/>
        <Image style={styles.top_img2} source={IMAGES_PATH.image2}/>
      </View>
        <FastImage
          style={{
            width: Dimensions.get('window').width,
            height: thumbsize.height * Dimensions.get('window').width / thumbsize.width
          }}
          source={{uri}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={[styles.mb1, styles.middle]}>
          <Text style={styles.middleTitle}>Carmen Lee</Text>
          <Text style={styles.middleUnderTitle}>AKA Admin</Text>
          <View style={styles.miss}>
            <View style={styles.since}>
              <Text style={[styles.whiteColor, gStyle.fontWeightBold]}>Missing Since: {moment(missingContent.missing_since).format("dd, MMM, YY")}</Text>
            </View>
            <View style={styles.from}>
              <Text style={[styles.whiteColor, gStyle.fontWeightBold]}>Missing From: {missingContent.duo_location}</Text>
            </View>
          </View>
        </View>
        <View style={[gStyle.p1, styles.detail]}>
          <View style={gStyle.d_flex}>
            <View style={[styles.vp1, gStyle.d_flex, gStyle.flexWrap, styles.flexShrink, gStyle.flexGrowOne]}>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Sex</Text>
                <Text style={styles.cirText}>{missingContent.sex}</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Age</Text>
                <Text style={styles.cirText}>{isNaN(moment().year() - moment(missingContent.dob).year()) ? '' : moment().year() - moment(missingContent.dob).year()} Yrs</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Race</Text>
                <Text style={styles.cirText}>{missingContent.race}</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Height</Text>
                <Text style={styles.cirText}>{missingContent.height_cm ? missingContent.height_cm + ' cm' : missingContent.height_ft + ' ft'}</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Weight</Text>
                <Text style={styles.cirText}>{missingContent.weight_kg ? missingContent.weight_kg + ' kg' : missingContent.weight_lb + ' lb'}</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Language</Text>
                <Text style={styles.cirText}>{missingContent.language}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.grow1, styles.mr1, styles.circumstace]}>
            <Text style={[styles.primaryColor, gStyle.fontWeightBold]}>Circumstances</Text>
            <Text style={[styles.cirText, gStyle.fontWeightBold]}>Lee was last seen with friends talking with an unknown man at walmart.</Text>
          </View>
        </View>
      <View style={[styles.footer, gStyle.d_flex, styles.hp1]}>
        <View style={[styles.grow1, styles.phone]}>
        <View style={styles.avatar_position}>
          <Avatar
            rounded
            source={{uri: avatarPath}}
            style={styles.avatar}
          />
        </View>
          <View style={styles.footer_tap}>
            <Text style={styles.footer_title}>WITH ANY INFORMATION CALL THE FOLLOWING NUMBERS</Text>
          </View>
          <View stlye={styles.ph1}>
            <Text style={styles.middleUnderTitle}>With any information Call</Text>
            <Text style={styles.middleTitle}>012-345-6789</Text>
          </View>
          <View style={styles.ph2}>
            <Text style={styles.middleUnderTitle}>With any information Call</Text>
            <Text style={styles.middleTitle}>012-345-6789</Text>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

export default compose(
  connect(selector, null)
)(Init);
