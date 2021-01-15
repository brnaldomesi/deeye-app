import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: Size()
  },
  divider: {
    backgroundColor: Colors.divider,
    marginHorizontal: Size(),
    marginVertical: Size(.7)
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
  commentImg: {
    width: undefined,
    height: Size(),
    aspectRatio: 1,
    marginBottom: Size(.3)
  },
  saveImg: {
    width: undefined,
    height: Size(),
    aspectRatio: 48/61,
    marginBottom: Size(.3)
  },
  suppportImg: {
    width: undefined,
    height: Size(),
    aspectRatio: 72/63,
    marginBottom: Size(.3)
  },
  shareImg: {
    width: undefined,
    height: Size(),
    aspectRatio: 75/64,
    marginBottom: Size(.3)
  },
  sendImg: {
    width: undefined,
    height: Size(),
    aspectRatio: 1,
    marginBottom: Size(.3)
  },
  caption: {
    paddingHorizontal: Size(),
    paddingTop: Size()
  },
  thumbnail: {
    width: '100%',
    height: Size(13),
    borderRadius: Size(),
  },
  contactImg: {
    width: Size(),
    height: Size()
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
    borderBottomRightRadius: Size(1.5),
    paddingHorizontal: Size(.7),
    paddingVertical: Size(.2)
  }
});

export default styles;
