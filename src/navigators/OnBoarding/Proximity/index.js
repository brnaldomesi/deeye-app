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

const Proximity = ({navigation}) => {
  const handleNext = () => {
    navigation.navigate('ExtendSearch');
  };

  return (
    <View style={[basicPadding, styles.root]}>
      <View style={flexOne}>
        <View style={styles.imageView}>
          <Image style={styles.iamge} source={IMAGES_PATH.onboardingProximity} />
        </View>
        <View style={styles.headingView}>
          <Text style={styles.heading}>Proximity Alert</Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.content}>Missing persons post get to anyone within the proximity of last seen location of the missing person and get help in the search prompt.</Text>
        </View>
        <View style={styles.roundNavigationView}>
          <RoundNavigation active="proximity" navigation={navigation} />
        </View>
      </View>
      <GradientButton 
        onPress={handleNext}
        gradientColors={gradientColors}
        buttonStyle={roundRectFullWidthButtonStyle}
        fontSize={Size(1.2)}
        text="Finish"
        textColor="white"
        style={styles.nextButton}
      />
    </View>
  )
}

export default Proximity;
