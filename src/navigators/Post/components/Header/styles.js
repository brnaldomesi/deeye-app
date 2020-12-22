import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: Size(),
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    elevation: 15
  },
  button: {
    borderRadius: Size(2),
    paddingHorizontal: Size(1.5),
    paddingVertical: Size(0.3),
  }
});

export default styles;
