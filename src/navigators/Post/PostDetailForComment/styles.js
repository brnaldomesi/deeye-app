import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  submitComment: {
    marginTop: Size(.1),
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  commentInput: {
    marginLeft: Size(.5),
    borderRadius: Size(),
    backgroundColor: Colors.postBottom.primary
  }
});

export default styles;
