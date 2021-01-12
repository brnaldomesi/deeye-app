import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  post: {
    height: Size(15),
    width: '100%',
  },
  deleteBtn: {
    width: Size(7),
    alignSelf: 'center',
    borderRadius: Size(2),
    marginTop: Size()
  }
});

export default styles;
