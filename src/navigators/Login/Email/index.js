import {
  Colors,
  Size,
  borderPrimary,
  flexRow,
  gradientColors,
  loginHorizontalPadding,
  relative,
  roundRectFullWidthButtonStyle,
  textInput,
} from 'src/styles';
import {
  Image,
  Text,
  View
} from 'react-native';
import React, { useState } from 'react';

import GradientButton from 'src/components/GradientButton';
import { IMAGES_PATH } from 'src/config/constants';
import MyTextInput from 'src/components/MyTextInput';
import PropTypes from 'prop-types'
import { authCheckUser } from 'src/redux/modules/auth';
import { connect } from 'react-redux';
import styles from './styles';

const Email = ({ navigation, authCheckUser }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(0);

  const handleConfirm = () => {
    const hasError = validateEmail(email);

    if(!hasError) {
      authCheckUser({
        data: { email },
        success: res => {
          if(res.status === 200) {
            navigation.navigate('Password', {email});
          } else if(res.status === 404) {
            navigation.navigate('UserInfo', {email});
          }
        },
        fail: err => {
          setError(1);
        }
      });
    }
  }

  const validateEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setError(1);
      return true;
    } else {
      setError(-1);
      return false;
    }
  }

  return (
    <View style={loginHorizontalPadding}>
      <Text style={styles.emailLabel}>Email Address</Text>
      <View style={[flexRow, relative]}>
        <MyTextInput
          placeholder="Enter your email address"
          name="email"
          style={textInput}
          value={email}
          onChangeText={ text => setEmail(text) }
          error={error}
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="emailAddress"
          autoFocus
          fullWidth
        />

        <Image
          style={styles.checkCircle}
          source={error === -1 ? IMAGES_PATH.checked : IMAGES_PATH.unchecked}
        />
      </View>
      <GradientButton
        onPress={handleConfirm}
        gradientColors={error === -1 ? gradientColors : ['white', 'white']}
        text="Confirm"
        textColor={error === -1 ? 'white' : Colors.primary}
        fontSize={Size(1.2)}
        fontWeight="bold"
        style={styles.confirmButton}
        buttonStyle={error === -1 ? roundRectFullWidthButtonStyle : [roundRectFullWidthButtonStyle, borderPrimary]}
      />
    </View>
  )
};

Email.propTypes = {
  navigation: PropTypes.object,
  authCheckUser: PropTypes.func
}

const actions = {
  authCheckUser
}

export default connect(
  null,
  actions
)(Email);
