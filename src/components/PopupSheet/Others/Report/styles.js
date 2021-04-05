import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';
import { white } from 'ansi-colors';

const styles = StyleSheet.create({
  title: {
    fontSize: Size(1.2),
    marginTop: Size(0.5)
  },
  content: {
    fontSize: Size(0.8),
  },
  item: {
    marginLeft: Size(1),
    marginRight: Size(1),
    paddingTop: 0.5
  },
  header_title: {
    paddingTop: 12,
    backgroundColor: 'white',
    fontSize: Size(1.5),
    paddingLeft: Size(2),
    paddingRight: Size(2),
    paddingBottom: Size(.1),
    fontWeight: '500'
  },
  header_content: {
    backgroundColor: 'white',
    fontSize: Size(1.3),
    paddingLeft: Size(2),
    paddingRight: Size(2),
    borderBottomWidth: 0.2,
    fontWeight: '100',
    paddingBottom: 10
  },
});

export default styles;
