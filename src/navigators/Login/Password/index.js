import {
  Colors,
  Size,
  gradientColors,
  loginHorizontalPadding,
  roundRectFullWidthButtonStyle,
  textInput
} from 'src/styles';
import React, { useState } from 'react';
import {
  Text,
  View
} from 'react-native';

import GradientButton from 'src/components/GradientButton';
import MyTextInput from 'src/components/MyTextInput';
import PropTypes from 'prop-types';
import { authLogin } from 'src/redux/modules/auth';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fcmTokenSelector } from 'src/redux/modules/auth';
import styles from './styles';
import { useDeviceName } from 'react-native-device-info';

const Password = ({ 
  route, 
  navigation, 
  authLogin,
  fcmToken
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(0);
  const { email } = route.params; 
  const { result: deviceName } = useDeviceName();

  const handleConfirm = () => {
    authLogin({ 
      data: { email, password, deviceName, fcmToken },
      fail: err => {
        setError(1);
      }
    });
  }

  return (
    <View style={[loginHorizontalPadding, styles.root]}>
      <View>
        <Text style={styles.passwordLabel}>Password</Text>
        <MyTextInput 
          placeholder="Enter your password"
          name="password"
          style={textInput}
          value={password}
          onChangeText={ text => setPassword(text) }
          error={error}
          secureTextEntry
          autoCompleteType="password" 
          textContentType="password"
          autoFocus
          fullWidth
        />
      </View>
      <GradientButton 
        onPress={handleConfirm}
        gradientColors={gradientColors}
        text="Confirm"
        textColor="white"
        fontSize={Size(1.2)}
        fontWeight="bold"
        style={styles.confirmButton}
        buttonStyle={roundRectFullWidthButtonStyle}
      />
    </View>
  )
};

Password.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  authLogin: PropTypes.func
}

const actions = {
  authLogin
}

const selector = createStructuredSelector({
  fcmToken: fcmTokenSelector
})

export default connect(
  selector,
  actions
)(Password);
