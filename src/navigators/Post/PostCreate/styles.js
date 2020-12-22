import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between'
  },
  bottomMenu: {
    backgroundColor: 'white',
    borderTopLeftRadius: Size(),
    borderTopRightRadius: Size(),
  },
  bottomMenuHeader: {
    backgroundColor: 'white',
    borderTopLeftRadius: Size(),
    borderTopRightRadius: Size(),
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowRadius: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
  },
  bar: {
    backgroundColor: Colors.divider,
    borderRadius: Size(),
    width: Size(2.7),
    height: Size(0.3),
    marginVertical: Size(0.6),
    alignItems: 'center',
  },
  icon: {
    height: Size(1.5),
    width: undefined,
    marginBottom: Size(.5)
  },
  photoSizeSelect1: {
    aspectRatio: 52/43
  },
  featherVideo1: {
    aspectRatio: 104/67
  },
  camera: {
    aspectRatio: 113/94
  },
  shapeActive3: {
    aspectRatio: 31/42
  }
});

export default styles;
