import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  list: {
    marginTop: -3,
    marginBottom: -3,
    paddingTop: -3,
    paddingBottom: -3
  },
});

export default styles;
