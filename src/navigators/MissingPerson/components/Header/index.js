import { Text, View } from 'react-native';
import {
  absolute,
  bgPrimary,
  border1,
  borderWhite,
  itemsCenter,
  justifyCenter,
  m1,
  p1,
  relative,
  roundedFull,
  selfCenter,
  textDot7,
  textWhite,
  textXl
} from 'src/styles';

import React from 'react';
import styles from './styles';

const Header = ({ title, step }) => {
  return (
    <View 
      style={[
        relative, 
        bgPrimary,
        itemsCenter,
        p1
      ]}
    >
      <Text style={[textWhite, textXl]}>{title}</Text>
      <View style={[absolute, styles.step]}>
        <Text 
          style={[
            textDot7, 
            textWhite, 
            selfCenter
          ]}
        >
          Step
        </Text>
        <View 
          style={[
            roundedFull, 
            borderWhite, 
            border1, 
            itemsCenter, 
            justifyCenter, 
            styles.stepCircle
          ]}
        >
          <Text style={textWhite}>{step}/3</Text>
        </View>
      </View>
    </View>
  )
};

export default Header;