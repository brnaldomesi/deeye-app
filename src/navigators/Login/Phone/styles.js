import {
  Colors,
  Size,
  normalFontSize
} from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  phoneNumberLabel: { 
    fontSize: normalFontSize, 
    marginBottom: Size(0.5),
    marginTop: Size(2)
  },
  checkCircle: {
    width: Size(1.5),
    height: Size(1.5),
    aspectRatio: 43/42,
    position: 'absolute',
    left: '100%',
    top: Size(0.75),
    marginLeft: Size(0.5)
  },
  confirmButton: {
    marginTop: Size(3),
  }
});

export default styles;
