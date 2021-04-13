import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backView: {
    top: Size(.5),
    left: Size()
  },
  backImg: {
    width: Size(1.2),
    height: Size(1.2),
  },
  badge: {
    width: Size(1.2),
    height: Size(1.5),
    top: Size(3),
    right: Size(1)
  },
  missing: {
    bottom: 0,
    right: 0,
    borderTopLeftRadius: Size(),
    paddingHorizontal: Size(.7),
    paddingVertical: Size(.2)
  },
  bottom: {
    height: Size(12)
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0
  },
  divider: {
    marginHorizontal: Size(.2),
    marginVertical: Size(.7)
  },
  sliderView: {
    height: Size(18),
  },
  post: {
    height: '100%',
    width: '100%'
  },
});

export default styles;
