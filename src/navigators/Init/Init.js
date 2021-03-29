/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useState } from 'react';
import * as gStyle from 'src/styles'
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import * as RootNavigation from "../Ref";
import {createStructuredSelector} from "reselect";
import {isAuthenticatedSelector} from "../../redux/modules/auth";
import {compose} from "redux";
import {connect} from "react-redux";
import { addIntro } from "../../redux/modules/alert";

const Init = ({ route, navigation, isAuthenticated, addIntro }) => {

  const handleNext = () => {
    addIntro(true);
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
      </View>
    </View>
  );
};

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

const actions = {
  addIntro
};

export default compose(
  connect(selector, actions)
)(Init);
