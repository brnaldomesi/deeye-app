import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  square: {
    width: Size(2),
    height: Size(2)
  },
  contactImgView: {
    backgroundColor: 'white',
    borderRadius: Size(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000000',
    elevation: 9,
    shadowOpacity: 0.25
  },
  contactImg: {
    borderTopLeftRadius: Size(),
    borderTopRightRadius: Size(),
    width: '100%',
    height: Size(10)
  },
  contactDesc: {
    borderBottomLeftRadius: Size(),
    borderBottomRightRadius: Size(),
  }
});

export default styles;
