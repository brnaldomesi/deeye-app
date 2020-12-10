import {
  Colors,
  Size,
  borderPrimary,
  flexRowDirection,
  gradientColors,
  loginHorizontalPadding,
  loginTextInput,
  positionRelative,
  roundRectFullWidthButtonStyle,
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
import styles from './styles';

const Email = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(0);

  const handleConfirm = () => {
    navigation.navigate('Password');
  }

  const validateEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setError(1);
    } else {
      setError(-1);
    }
  } 
  
  return (
    <View style={loginHorizontalPadding}>
      <Text style={styles.emailLabel}>Email Address</Text>
      <View style={[flexRowDirection, positionRelative]}>
        <MyTextInput 
          placeholder="Enter your email address"
          name="email"
          style={loginTextInput}
          value={email}
          onChangeText={ text => setEmail(text) }
          onBlur={validateEmail}
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
        textColor={error === -1 ? 'white' : Colors.button.primary}
        fontSize={Size(1.2)}
        fontWeight="bold"
        style={styles.confirmButton}
        buttonStyle={error === -1 ? roundRectFullWidthButtonStyle : [roundRectFullWidthButtonStyle, borderPrimary]}
      />
    </View>
  )
};

export default Email;
