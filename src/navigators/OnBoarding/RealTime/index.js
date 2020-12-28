import { Image, Text, View } from 'react-native';
import {
  Size,
  flexOne,
  gradientColors,
  roundRectFullWidthButtonStyle
} from 'src/styles';
import { basicPadding, itemsCenter } from 'src/styles';

import GradientButton from 'src/components/GradientButton';
import { IMAGES_PATH } from 'src/config/constants';
import React from 'react';
import RoundNavigation from 'src/navigators/OnBoarding/RoundNavigation';
import styles from './styles';

const RealTime = ({navigation}) => {
  const handleNext = () => {
    navigation.navigate('Proximity');
  };

  return (
    <View style={[basicPadding, styles.root]}>
      <View style={flexOne}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={IMAGES_PATH.onboardingRealTime} />
        </View>
        <View style={styles.headingView}>
          <Text style={styles.heading}>Real Time Update</Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.content}>Make the post and all members will be notified to help in the search from anywhere and receive tips.</Text>
        </View>
        <View style={styles.roundNavigationView}>
          <RoundNavigation active="realTime" navigation={navigation} />
        </View>
      </View>
      <GradientButton 
        onPress={handleNext}
        gradientColors={gradientColors}
        buttonStyle={roundRectFullWidthButtonStyle}
        fontSize={Size(1.2)}
        text="Next"
        textColor="white"
        style={styles.nextButton}
      />
    </View>
  )
}

export default RealTime;
