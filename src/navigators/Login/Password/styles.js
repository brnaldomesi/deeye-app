import {
  Colors,
  Size,
  normalFontSize
} from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  passwordLabel: { 
    fontSize: normalFontSize, 
    marginBottom: Size(0.5),
    marginTop: Size(0.8)
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
  smallCheckCircle: {
    width: Size(),
    height: Size(),
  },
  confirmButton: {
    marginTop: Size(2),
  },
  ruleSection: {
    paddingHorizontal: Size(.5),
    paddingTop: Size(.5)
  }
});

export default styles;
