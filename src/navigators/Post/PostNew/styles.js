import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between'
  },
  bottomMenu: {
    backgroundColor: Colors.postBottom.primary,
    borderTopLeftRadius: Size(),
    borderTopRightRadius: Size(),
  },
  bottomMenuHeader: {
    backgroundColor: Colors.postBottom.primary,
    borderTopLeftRadius: Size(),
    borderTopRightRadius: Size(),
    alignItems: 'center',
    paddingBottom: Size(),
    borderBottomWidth: 0,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    elevation: 9
  },
  bar: {
    backgroundColor: 'white',
    borderRadius: Size(),
    width: Size(2.7),
    height: Size(0.3),
    marginVertical: Size(0.6),
    alignItems: 'center',
  }
});

export default styles;
