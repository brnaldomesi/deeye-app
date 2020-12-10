import {
  Colors,
  flexOne,
  gradientColors,
  loginHeaderStyle
} from 'src/styles';
import { Text, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import styles from './styles';

const LoginHeader = () => {
  
  return (
    <LinearGradient 
      colors={gradientColors} 
      style={[flexOne, loginHeaderStyle]}
      start={{x:0, y:0}}
      end={{x:1, y: 0}}
    >
      <View style={styles.bar} />
    </LinearGradient>
  )
};

export default LoginHeader;
