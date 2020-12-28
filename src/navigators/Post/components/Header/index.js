import {
  Colors,
  fontWeightBold,
  marginVerticalAuto,
  ml,
  textXl
} from 'src/styles';
import { Size, flexRowDirection } from 'src/styles';
import { Text, View } from 'react-native';

import AntIcon from 'react-native-vector-icons/AntDesign';
import MyButton from 'src/components/MyButton';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

const Header = ({
  handleClose,
  handlePost,
  title,
  rightButton,
  buttonPrimary
}) => {
  return (
    <View style={styles.root}>
      <View style={flexRowDirection}>
        <MyButton row onPress={handleClose}>
          <AntIcon size={25} name="close" color={Colors.button.primary} />
        </MyButton>
        <View style={[ml, marginVerticalAuto]}>
          <Text style={[fontWeightBold, textXl]}>{title}</Text>
        </View>
      </View>
      {rightButton && 
        <View>
          <MyButton 
            row 
            style={styles.button} 
            onPress={handlePost} 
            variant={buttonPrimary ? "primary" : undefined} 
            outlined 
            title="Post" 
          />
        </View>
      }
    </View>
  );
};

Header.propTypes = {
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  rightButton: PropTypes.bool,
}

export default Header;
