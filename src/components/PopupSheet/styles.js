import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  settingImg: {
    width: Size(1.6),
    height: Size(1.6),
    resizeMode: 'contain'
  },
  dotSymbol: {
    width: Size(1.5),
  },
  title: {
    fontSize: Size(1.2),
  },
  content: {
    fontSize: Size(0.6)
  },
  icon: {
    marginLeft: Size(0.3),
    marginRight: Size(0.3),
    fontSize: Size(1.6)
  },
  top: {
    height: Size(2.8),
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    marginTop: -3,
    marginBottom: -3,
    paddingTop: -3,
    paddingBottom: -3
  },
  topStyle: {
    width: 80,
    height: 10,
    borderRadius: 20,
    backgroundColor: '#e2e2e2',
    alignSelf: 'center',
    marginTop: -22,
  },
  close: {
    position: 'absolute',
    alignSelf: 'flex-end',
    fontSize: Size(1.5),
    top: 15,
    right: 20,
  },
  back: {
    position: 'absolute',
    alignSelf: 'flex-start',
    fontSize: Size(1.5),
    top: 15,
    left: 20,
  },
  button: {
    paddingLeft: Size(1),
    paddingRight: Size(.5)
  }
});

export default styles;
