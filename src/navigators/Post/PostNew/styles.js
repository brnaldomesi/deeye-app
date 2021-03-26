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
  },
  bar: {
    backgroundColor: 'grey',
    borderRadius: Size(),
    width: Size(3.7),
    height: Size(0.1),
    marginVertical: Size(0.6),
    marginTop: Size(1.2),
    marginBottom: Size(-0.5),
    alignItems: 'center',
  },
  subtitle: {
    marginTop: Size(0.3),
    fontSize: 15,
    color: 'grey'
  }
});

export default styles;
