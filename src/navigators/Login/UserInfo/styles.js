import {
  Colors,
  Size,
} from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  firstLabel: {
    fontSize: Size(),
    marginBottom: Size(0.5),
    marginTop: Size(2)
  },
  lastLabel: {
    fontSize: Size(),
    marginBottom: Size(0.5),
    marginTop: Size(1)
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
    marginTop: Size(4),
  }
});

export default styles;
