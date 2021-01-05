import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Size,
  flexCol,
  marginVerticalAuto
} from 'src/styles';

import { IMAGES_PATH } from 'src/config/constants';
import PropTypes from 'prop-types';
import React from 'react';
import StyleSheetFactory from './styles';

const IconButton = ({ 
  onPress, 
  text, 
  imageName, 
  aspectRatio 
}) => {
  const styles = StyleSheetFactory.getSheet(aspectRatio);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={flexCol}>
        <Image 
          style={styles.iconImage} 
          source={IMAGES_PATH[imageName]} 
        />
        <View style={[{ marginLeft: Size(2) }, marginVerticalAuto]}>
          <Text style={{
            fontSize: Size(1.2)
          }}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired
}

export default IconButton;
