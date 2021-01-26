import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  settingImg: {
    width: Size(.3),
    height: Size(),
  },
  dotSymbol: {
    width: Size(1.5),
  },
  likeImg: {
    width: Size(1.1),
    height: Size(),
    marginTop: Size(.5)
  },
  content: {
    maxWidth: Size(12)
  },
  interactionBtn: {
    padding: 0,
    marginLeft: Size(.5)
  },
  interactionTitle: {
    color: 'black',
    fontSize: Size(.9)
  }
});

export default styles;
