/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  Size,
  flexOne,
  gradientColors,
  itemsCenter,
  roundMediumSizeButtonStyle
} from 'src/styles'
import { Text, View } from 'react-native';

import Feeds from './Feeds';
import Footer from 'src/components/Footer';
import GradientButton from 'src/components/GradientButton';
import styles from './styles';

const Home = ({ route, navigation }) => {
   
  const [footerRoute, setFooterRoute] = route.params === undefined ? useState('feeds') : useState(route.params.query);

  const handleViewMore = () => {
    
  };

  return (
    <View style={flexOne}>
      <Feeds footerRoute={footerRoute} />
      {/* <GradientButton 
        onPress={handleViewMore}
        gradientColors={gradientColors}
        buttonStyle={roundMediumSizeButtonStyle}
        text="View More Post"
        textColor="white"
        fontSize={Size()}
        style={styles.gradientButton}
      /> */}
      <Footer style={styles.footer} footerRoute={footerRoute} />
    </View>
  );
};

export default Home;
