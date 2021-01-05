import {
  Colors,
  Size,
  borderPrimary,
  flexCol,
  flexOne,
  gradientColors,
  loginHorizontalPadding,
  relative,
  roundRectFullWidthButtonStyle,
  textInput
} from 'src/styles';
import {
  Image,
  Text,
  View
} from 'react-native';
import React, { useState } from 'react';

import AntIcon from 'react-native-vector-icons/AntDesign';
import GradientButton from 'src/components/GradientButton';
import { IMAGES_PATH } from 'src/config/constants';
import { TextInputMask } from 'react-native-masked-text';
import styles from './styles';

const Phone = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(0);

  const handleVerify = () => {
    navigation.navigate('OtpCode', {phoneNumber});
  }

  const validatePhoneNumber = (value, settings) => () => {
  }
  
  return (
    <View style={loginHorizontalPadding}>
      <Text style={styles.phoneNumberLabel}>Phone Number</Text>
      <View style={[flexCol, relative]}>
        <TextInputMask
          type={'custom'}
          options={{
            mask: '999-999-9999',
            validator: validatePhoneNumber
          }}
          value={phoneNumber}
          onChangeText={ text => setPhoneNumber(text) }
          style={[textInput, flexOne]}
          placeholder="Enter your phone number"
          autoCompleteType="tel"
          keyboardType="numeric"
          textContentType="telephoneNumber"
        />
        <Image 
          style={styles.checkCircle}
          source={error === -1 ? IMAGES_PATH.checked : IMAGES_PATH.unchecked} 
        />
      </View>
      <Text 
        style={{
          marginTop: Size(0.5),
          padding: Size()
        }}
      >
        <AntIcon name="exclamationcircleo" color={Colors.primary} />  A OTP codd will be sent to the phone number, keep your phone close.
      </Text>
      <GradientButton 
        onPress={handleVerify}
        gradientColors={error === -1 ? gradientColors : ['white', 'white']}
        text="Verify"
        textColor={error === -1 ? 'white' : Colors.primary}
        fontSize={Size(1.2)}
        fontWeight="bold"
        style={styles.confirmButton}
        buttonStyle={error === -1 ? roundRectFullWidthButtonStyle : [roundRectFullWidthButtonStyle, borderPrimary]}
      />
    </View>
  )
};

export default Phone;
