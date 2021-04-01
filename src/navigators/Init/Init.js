/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useState} from 'react';
import * as gStyle from 'src/styles'
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';

import styles from './styles';
import {useFocusEffect} from '@react-navigation/native';
import * as RootNavigation from "../Ref";
import {createStructuredSelector} from "reselect";
import {isAuthenticatedSelector} from "../../redux/modules/auth";
import {compose} from "redux";
import {connect} from "react-redux";
import {Size} from "../../styles";
import {IMAGES_PATH} from "../../config/constants";

const Init = (props, {route, navigation, isAuthenticated}) => {

  console.log(props)

  const handleNext = () => {
    navigation.navigate(isAuthenticated ? 'Drawer' : 'OnBoarding');
  };

  return (
    <View style={gStyle.flexOne}>
      <View style={styles.header}>
        <View style={gStyle.d_flex}>
          <TouchableOpacity style={[gStyle.ml_auto]} onPress={handleNext}>
            <Text style={styles.btnSkip}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mb1}>
          <Text style={styles.headerTitle}>M I S S I N G</Text>
          <Text style={styles.headerUnderTitle}>P E R S O N</Text>
        </View>
      </View>
      <ScrollView>
        <View style={{height: Size(10), backgroundColor: 'white'}}>

        </View>
        <View style={[styles.mb1, styles.middle]}>
          <Text style={styles.middleTitle}>Carmen Lee</Text>
          <Text style={styles.middleUnderTitle}>AKA Admin</Text>
        </View>
        <View style={gStyle.p1}>
          <View style={[gStyle.d_flex]}>
            <View style={[styles.grow1, styles.mr1]}>
              <Text style={[styles.primaryColor, gStyle.fontWeightBold]}>Missing From: Claiborne, Maryland</Text>
              <Text style={[styles.primaryColor, gStyle.fontWeightBold]}>Missing Since: Tuesday November 12, 2019</Text>
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
                <Text style={styles.cirText}>Female</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Sex</Text>
                <Text style={styles.cirText}>Female</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Sex</Text>
                <Text style={styles.cirText}>Female</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Sex</Text>
                <Text style={styles.cirText}>Female</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Age</Text>
                <Text style={styles.cirText}>15 Yrs</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Race</Text>
                <Text style={styles.cirText}>Black</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Height</Text>
                <Text style={styles.cirText}>170 cm</Text>
              </View>
              <View style={styles.hr1}>
                <Text style={styles.yellowColor}>Weight</Text>
                <Text style={styles.cirText}>105 lb</Text>
              </View>
            </View>
            <View style={[gStyle.selfCenter, styles.wr1]}>
              <Image style={styles.centerImg} source={IMAGES_PATH.call}/>
            </View>
          </View>
          <View style={[styles.grow1, styles.mr1]}>
            <Text style={[styles.primaryColor, gStyle.fontWeightBold]}>Circumstances</Text>
            <Text style={[styles.cirText, gStyle.fontWeightBold]}>Lee was last seen with friends talking with an unknown man at walmart.</Text>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.footer, gStyle.d_flex, styles.hp1]}>
        <View style={[gStyle.selfCenter]}>
          <Image style={styles.centerImg} source={IMAGES_PATH.chat}/>
        </View>
        <View style={styles.grow1}>
          <Text style={styles.middleUnderTitle}>With any information Call</Text>
          <Text style={styles.middleTitle}>012-345-6789</Text>
        </View>
        <View style={[gStyle.selfCenter]}>
          <Image style={styles.centerImg} source={IMAGES_PATH.call}/>
        </View>
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
