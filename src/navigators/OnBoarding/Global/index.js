import { Image, Text, View } from 'react-native';
import {
  Size,
  flexOne,
  gradientColors,
  roundRectFullWidthButtonStyle
} from 'src/styles';
import { alignItemsCenter, basicPadding } from 'src/styles';

import GradientButton from 'src/components/GradientButton';
import { IMAGES_PATH } from 'src/config/constants';
import React from 'react';
import RoundNavigation from 'src/navigators/OnBoarding/RoundNavigation';
import styles from './styles';

const Global = ({navigation}) => {
  const handleNext = () => {
    navigation.navigate('RealTime');
  };

  return (
    <View style={[basicPadding, styles.root]}>
      <View style={flexOne}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={IMAGES_PATH.onboardingGlobal} />
        </View>
        <View style={styles.headingView}>
          <Text style={styles.heading}>Global Community</Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.content}>Meet a global community of members ready and willing to help find missing persons.</Text>
        </View>
        <View style={styles.roundNavigationView}>
          <RoundNavigation active="global" navigation={navigation} />
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

export default Global;
