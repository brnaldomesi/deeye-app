import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between'
  },
  bottomMenu: {
    marginTop: Size(.1),
    backgroundColor: 'white',
    borderTopLeftRadius: Size(),
    borderTopRightRadius: Size(),
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: '#000000',
    elevation: 4,
  },
  bottomMenuHeader: {
    backgroundColor: 'white',
    borderTopLeftRadius: Size(),
    borderTopRightRadius: Size(),
    alignItems: 'center',
    marginTop: Size()
  },
  bar: {
    backgroundColor: Colors.divider,
    borderRadius: Size(),
    width: Size(3),
    height: Size(0.1),
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
  },
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    flex: 1
  },
  preview: {
    flex: 1
  },
  post: {
    height: Size(15),
    width: '100%'
  },
  deletePost: {
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10
  },
  sliderView: {
    height: Size(18)
  }
});

export default styles;
