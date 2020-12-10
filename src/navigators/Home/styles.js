import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  gradientButton: {
    position: 'absolute',
    bottom: Size(7)
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginRight: -Size(),
    marginLeft: -Size(),
    marginBottom: -Size()
  }
});

export default styles;
