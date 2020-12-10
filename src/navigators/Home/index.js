/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  Size,
  alignItemsCenter,
  flexGrowOne,
  gradientColors,
  normalFontSize,
  roundMediumSizeButtonStyle
} from 'src/styles'
import { Text, View } from 'react-native';

import Footer from 'src/components/Footer';
import GradientButton from 'src/components/GradientButton';
import React from 'react';
import styles from './styles';

const Home = ({ navigation }) => {
  const handleViewMore = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.root}>
      <View style={[flexGrowOne, alignItemsCenter]}>
        <View style={{marginTop: Size(5), backgroundColor: 'gray'}}>
          <Text>Temp Content</Text>
        </View>
        <GradientButton 
          onPress={handleViewMore}
          gradientColors={gradientColors}
          buttonStyle={roundMediumSizeButtonStyle}
          text="View More Post"
          textColor="white"
          fontSize={normalFontSize}
          style={styles.gradientButton}
        />
      </View>
      <Footer style={styles.footer} />
    </View>
  );
};

export default Home;
