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

const ExtendSearch = ({navigation}) => {
  const handleNext = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={[basicPadding, styles.root]}>
      <View style={flexOne}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={IMAGES_PATH.onboardingExtendSearch} />
        </View>
        <View style={styles.headingView}>
          <Text style={styles.heading}>Extend Your Search</Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.content}>Get your missing person post rearch more members of the community across the world to help you in the serach.</Text>
        </View>
        <View style={styles.roundNavigationView}>
          <RoundNavigation active="extendSearch" navigation={navigation} />
        </View>
      </View>
      <GradientButton 
        onPress={handleNext}
        gradientColors={gradientColors}
        buttonStyle={roundRectFullWidthButtonStyle}
        fontSize={Size(1.2)}
        text="Finish"
        textColor="white"
      />
    </View>
  )
}

export default ExtendSearch;
