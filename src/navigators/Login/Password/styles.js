import {
  Size,
  normalFontSize
} from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between'
  },
  passwordLabel: { 
    fontSize: normalFontSize, 
    marginBottom: Size(0.5),
    marginTop: Size(0.8)
  },
  confirmButton: {
    marginBottom: Size(2),
  }
});

export default styles;
