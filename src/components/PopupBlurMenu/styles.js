import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  settingImg: {
    width: Size(.3),
    height: Size(1.6),
  },
  dotSymbol: {
    width: Size(1.5),
  },
  iconImg: {
    width: Size(.8),
    height: Size(.8),
    resizeMode: 'contain',
  }
});

export default styles;
