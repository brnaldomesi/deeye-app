import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';

const footerHeight = Size(3.5)

const styles = StyleSheet.create({
  addButtonView: {
    position: 'absolute',
    bottom: footerHeight + 7,
    width: '100%',
  },
  addButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20
  },
  outline: {
    flexDirection: 'row'
  },
  wing: {
    flex: 1,
    backgroundColor: 'white',
    borderTopColor: '#e7e7e7',
    borderTopWidth: 1
  },
  height: {
    height: footerHeight,
    top: -1,
    backgroundColor: 'white'
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: Size(1),
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Size()
  }
});

export default styles;
