/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  Text,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';

const GradientButton = ({ 
  onPress,
  gradientColors,
  buttonStyle,
  text,
  textColor,
  fontSize,
  fontWeight,
  style
}) => {

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <LinearGradient 
        colors={gradientColors} 
        style={buttonStyle}
        start={{x:0, y:0}}
        end={{x:1, y: 0}}
      >
        <Text style={{
          color: textColor,
          fontSize: fontSize,
          fontWeight: fontWeight
        }}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

GradientButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  gradientColors: PropTypes.array.isRequired,
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  style: PropTypes.object,
}

export default GradientButton;
