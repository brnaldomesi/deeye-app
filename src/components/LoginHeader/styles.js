import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.loginHeader.bar,
    borderRadius: Size(),
    width: Size(2.7),
    height: Size(0.3),
    marginTop: Size(0.6),
    alignItems: 'center',
  }
});

export default styles;
