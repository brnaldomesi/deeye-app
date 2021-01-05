import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center'
  },
  otpCodeView: {
    marginTop: Size()
  },
  changePhoneNumberButton: {
    marginTop: Size(0.5)
  },
  otpCodeLabel: {
    color: Colors.primary,
    fontSize: Size(1.2),
    marginTop: Size(),
    marginBottom: Size(0.5)
  },
  confirmButton: {
    marginTop: Size()
  },
  checkCircle: {
    width: Size(1.5),
    height: Size(1.5),
    aspectRatio: 43/42,
    position: 'absolute',
    right: 0 - Size(2),
    top: Size(0.75),
    marginLeft: Size(0.5)
  },
  checkCodeLabel: {
    marginTop: Size()
  }
});

export default styles;
