import {
  Colors,
  Size,
  flexCol
} from 'src/styles';
import { TouchableOpacity, View } from 'react-native';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import MyButton from 'src/components/MyButton';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

const RoundNavigation = ({active, navigation}) => {
  const handlePress = param => () => {
    navigation.navigate(param);
  }

  return (
    <View style={flexCol}>
      <MyButton row onPress={handlePress('Global')} style={styles.px1}>
        <FAIcon name="circle" color={active === 'global' ? Colors.primary : Colors.secondary} />
      </MyButton>
      <MyButton row onPress={handlePress('RealTime')} style={styles.px1}>
        <FAIcon name="circle" color={active === 'realTime' ? Colors.primary : Colors.secondary} />
      </MyButton>
      <MyButton row onPress={handlePress('Proximity')} style={styles.px1}>
        <FAIcon name="circle" color={active === 'proximity' ? Colors.primary : Colors.secondary} />
      </MyButton>
      <MyButton row onPress={handlePress('ExtendSearch')} style={styles.px1}>
        <FAIcon name="circle" color={active === 'extendSearch' ? Colors.primary : Colors.secondary} />
      </MyButton>
    </View>
  )
}

RoundNavigation.propTypes = {
  active: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
}

export default RoundNavigation;
