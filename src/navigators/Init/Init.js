/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as RootNavigation from 'src/navigators/Ref';
import * as gStyle from 'src/styles'

import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View, Clipboard, Linking, Platform} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';

import {IMAGES_PATH} from "../../config/constants";
import {Size} from "../../styles";
import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {isAuthenticatedSelector} from "../../redux/modules/auth";
import styles from './styles';
import {ASSET_BASE_URL} from "../../config/apipath";
import FastImage from "react-native-fast-image";
import moment from "moment";

const Init = ({route, isAuthenticated}) => {

  const [thumbsize, setThumbsize] = useState({width: Dimensions.get('window').width, height: Size(20)});
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

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (i === 4) {
        clearInterval(myInterval);
        RootNavigation.navigateAndSimpleReset(isAuthenticated ? 'Drawer' : 'OnBoarding');
      } else {
        i++;
        setTime(5 - i);
      }
    }, 1000);
    return () => clearInterval(myInterval);
  }, []);

  const handleNext = () => {
    RootNavigation.navigateAndSimpleReset(isAuthenticated ? 'Drawer' : 'OnBoarding');
  };

  const handlePhone = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + '012-345-6789' + '}';
    } else {
      phoneNumber = 'telprompt:${' + '012-345-6789' + '}';
    }

    Linking.openURL(phoneNumber);
  };

  const handleClip = () => {
    Clipboard.setString('012-345-6789')
  };

  return (
    <View style={gStyle.flexOne}>
      <View style={styles.header}>
        <View style={gStyle.d_flex}>
          <TouchableOpacity style={[gStyle.ml_auto]} onPress={handleNext}>
            <Text style={styles.btnSkip}>Skip {' '}{time}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mb1}>
          <Text style={styles.headerTitle}>M I S S I N G</Text>
          <Text style={styles.headerUnderTitle}>{missingContent.missing_type.replace('_', ' ')}</Text>
        </View>
      </View>
      <ScrollView>
        <FastImage
          style={{
            width: Dimensions.get('window').width,
            height: thumbsize.height * Dimensions.get('window').width / thumbsize.width
          }}
          source={{uri}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={[styles.mb1, styles.middle]}>
          <Text style={styles.middleTitle}>{missingContent.fullname}</Text>
          <Text style={styles.middleUnderTitle}>AKA</Text>
        </View>
        <View style={gStyle.p1}>
          <View style={[gStyle.d_flex]}>
            <View style={[styles.grow1, styles.mr1]}>
              <Text style={[styles.primaryColor, gStyle.fontWeightBold]}>Missing From: {missingContent.duo_location}</Text>
              <Text style={[styles.primaryColor, gStyle.fontWeightBold]}>Missing Since: {moment(missingContent.missing_since).format("dddd, MMMM D, YYYY")}</Text>
            </View>
            <View style={[gStyle.selfCenter, gStyle.d_flex]}>
              <Image style={styles.verifyImg} source={IMAGES_PATH.verifiedBadge}/>
              <Text style={styles.verifyText}>{' '}verified</Text>
            </View>
          </View>
          <View style={gStyle.d_flex}>
            <View style={[styles.vp1, gStyle.d_flex, gStyle.flexWrap, styles.flexShrink, gStyle.flexGrowOne]}>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Sex</Text>
                <Text style={styles.cirText}>{missingContent.sex !== null ? missingContent.sex : ''}</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Age</Text>
                <Text style={styles.cirText}>{isNaN(moment().year() - moment(missingContent.dob).year()) ? '' : moment().year() - moment(missingContent.dob).year()} Yrs</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Race</Text>
                <Text style={styles.cirText}>{missingContent.race !== null ? missingContent.race : ''}</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Height</Text>
                <Text style={styles.cirText}>{missingContent.height_cm ? (missingContent.height_cm === null ? '0' : missingContent.height_cm) + ' cm' : (missingContent.height_ft === null ? '0' : missingContent.height_ft) + ' ft'}</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Weight</Text>
                <Text style={styles.cirText}>{missingContent.weight_kg ? (missingContent.weight_kg === null ? '0' : missingContent.weight_kg) + ' kg' : (missingContent.weight_lb === null ? '0' : missingContent.weight_lb) + ' lb'}</Text>
              </View>
            </View>
            <View style={[gStyle.selfCenter, styles.wr1]}>
              {/*<Image style={styles.centerImg} source={IMAGES_PATH.call}/>*/}
            </View>
          </View>
          <View style={[styles.grow1, styles.mr1]}>
            <Text style={[styles.primaryColor, gStyle.fontWeightBold]}>Circumstances</Text>
            <Text style={[styles.cirText, gStyle.fontWeightBold]}>Lee was last seen with friends talking with an unknown man at walmart.</Text>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.footer, gStyle.d_flex, styles.hp1]}>
        <TouchableOpacity style={gStyle.d_flex} onPress={handleClip}>
          <View style={[gStyle.selfCenter]}>
            <Image style={styles.centerImg} source={IMAGES_PATH.chat}/>
          </View>
        </TouchableOpacity>
        <View style={styles.grow1}>
          <Text style={styles.middleUnderTitle}>With any information Call</Text>
          <Text style={styles.middleTitle}>012-345-6789</Text>
        </View>
        <TouchableOpacity style={gStyle.d_flex} onPress={handlePhone}>
          <View style={[gStyle.selfCenter]}>
            <Image style={styles.centerImg} source={IMAGES_PATH.call}/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

export default compose(
  connect(selector, null)
)(Init);
