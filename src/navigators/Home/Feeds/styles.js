import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: Size()
  },
  settingImg: {
    width: Size(.3),
    height: undefined,
    aspectRatio: 12/63
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
  }
});

export default styles;
