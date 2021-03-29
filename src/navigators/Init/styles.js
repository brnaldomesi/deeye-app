import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: Size(5),
    backgroundColor: '#05174f',
  },

  btnSkip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: 'white',
    backgroundColor: '#ffffff50',
    borderRadius: 20,
    marginTop: 10,
    marginRight: 5,
  }
});

export default styles;
