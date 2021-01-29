import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  banner: {
    height: Size(6),
    width: '100%'
  },
  sizeTwo: {
    width: Size(2),
    height: Size(2)
  },
  close: {
    right: Size(.3),
    top: Size(.2),
  },
  avatar: {
    width: Size(3),
    height: Size(3)
  },
  avatarBig: {
    width: Size(4),
    height: Size(4),
    top: 0,
    transform: [{
      translateY: Size(-3)
    }],
  },
  menuBtn: {
    borderRadius: Size(),
    marginRight: Size(),
    paddingHorizontal: Size(),
    borderWidth: 1,
    paddingVertical: Size(.2)
  },
  sizeOne: {
    width: Size(),
    height: Size(),
  },
  activityBadge: {
    width: Size(1.5),
    height: Size(2)
  },
  settings: {
    width: Size(1.5),
    height: Size(1.5)
  },
  subtitle: {
    maxWidth: Size(11),
    marginHorizontal: Size(.5)
  }
});

export default styles;
