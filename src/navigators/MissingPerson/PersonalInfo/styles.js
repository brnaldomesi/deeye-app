import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pickView: {
    borderRadius: Size(),
    borderWidth: 1,
    borderColor: Colors.primary,
    height: Size(10)
  },
  square: {
    width: Size(2),
    height: Size(2)
  },
  genderImg: {
    width: Size(1.5),
    height: Size(1.5)
  },
  uploadSubscription: {
    bottom: Size()
  },
  switchBtn: {
    width: Size(2.6),
    height: Size(2.6)
  },
  dropdown: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: Size(.5),
  }
});

export default styles;
