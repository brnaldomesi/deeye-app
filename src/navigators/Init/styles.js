import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#05174f',
  },

  middle: {
    backgroundColor: '#05174f',
  },

  footer: {
    backgroundColor: '#05174f',
  },

  primaryColor: {
    color: '#05174f'
  },

  cirText: {
    color: 'gray',
    fontSize: Size(.7),
  },

  btnSkip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: 'white',
    backgroundColor: '#ffffff50',
    borderRadius: 20,
    marginTop: 10,
    marginRight: 5,
  },

  headerTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: Size(3),
  },

  headerUnderTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: Size(1.5),
  },

  middleTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: Size(2),
  },

  middleUnderTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: Size(1),
    marginBottom: 5
  },

  mb1: {
    marginBottom: 10,
  },

  centerImg: {
    width: Size(2),
    height: Size(2),
  },

  grow1: {
    flexGrow: 1,
    flexShrink: 1
  },

  hp1: {
    paddingHorizontal: 10
  },

  hr1: {
    paddingRight: 10
  },

  mr1: {
    marginRight: 10
  },

  verifyImg: {
    width: Size(1),
    height: Size(1),
    resizeMode: 'contain'
  },

  verifyText: {
    fontSize: Size(.6),
    color: 'green'
  },

  vp1: {
    paddingVertical: 10
  },

  yellowColor: {
    color: '#ed8829'
  },

  wr1: {
    width: Size(2),
  },

  flexShrink: {
    flexShrink: 1,
  }

});

export default styles;
