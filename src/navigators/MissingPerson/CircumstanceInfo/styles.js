import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  square: {
    width: Size(2),
    height: Size(2)
  },
  circumstance: {
    height: Size(7)
  },
  limitText: {
    bottom: 5,
    right: 10
  },
  missingFromInput: {
    backgroundColor: 'transparent',
    height: Size(2.5),
    paddingHorizontal: 0
  }
});

export default styles;
