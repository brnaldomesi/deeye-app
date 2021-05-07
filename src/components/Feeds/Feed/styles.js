import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: Size()
  },
  footer: {
    backgroundColor: Colors.postBottom.primary,
    borderBottomLeftRadius: Size(),
    borderBottomRightRadius: Size(),
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    elevation: 9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Size()
  },
  thumbnail: {
    width: '100%',
    height: Size(13),
    borderRadius: Size(),
  },
  badge: {
    width: Size(1.2),
    height: Size(1.5),
    top: Size(.5),
    right: Size(1)
  },
  missingDays: {
    bottom: 0,
    right: 0,
    borderTopLeftRadius: Size(),
    paddingHorizontal: Size(.7),
    paddingVertical: Size(.2)
  },
  sharedby: {
    borderRadius: Size(),
    borderColor: Colors.secondary,
    borderWidth: 1,
    width: Size(5),
  },
  divider: {
    marginTop: Size(0.5),
    backgroundColor: Colors.divider
  },
  btnFollow: {
    borderRadius: Size(),
    marginRight: Size(),
    paddingHorizontal: Size(),
    borderWidth: 1,
    paddingVertical: Size(.2)
  },
  followIcon: {
    width: Size(.7),
    height: Size(.7),
    resizeMode: 'contain',
    marginHorizontal: Size(.5)
  }
});

export default styles;
