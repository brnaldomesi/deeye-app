import {
  Colors,
  Size,
  borderDisabled,
  borderPrimary,
  borderSecondary,
  flexCol,
  gradientColors,
  loginHorizontalPadding,
  relative,
  roundRectFullWidthButtonStyle,
  roundWrapButtonStyle,
  textInput
} from 'src/styles';
import {
  Image,
  Text,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';

import AntIcon from 'react-native-vector-icons/AntDesign';
import GradientButton from 'src/components/GradientButton';
import { IMAGES_PATH } from 'src/config/constants';
import { TextInputMask } from 'react-native-masked-text';
import styles from './styles';

const OtpCode = ({ route, navigation }) => {
  const [error, setError] = useState(0);
  const [otpcode, setOtpcode] = useState('');
  const { phoneNumber } = route.params; 
  const [leftTime, setLeftTime] = useState(30);

  useEffect(() => {
    let interval = null;
    if(error !== -1) {
      interval = setInterval(() => {
        setLeftTime(leftTime => leftTime - 1);
      }, 1000);
    } else {
      clearInterval(interval)
    }
    
    if( leftTime === 0 ) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [error, leftTime])

  const handleChangePhoneNumber = () => {
    navigation.navigate('Phone');
  }

  const handleVerify = () => {

  }

  const validatePhoneNumber = (value, settings) => () => {

  }
  
  return (
    <View style={loginHorizontalPadding}>
      <View style={styles.centerView}>
        <View style={styles.otpCodeView}>
          <Text>Please enter the OTP Code sent to your phone number <Text style={{ color: '#0654d8' }}>{phoneNumber}</Text></Text>
        </View>
        <GradientButton 
          onPress={handleChangePhoneNumber}
          gradientColors={['white', 'white']}
          text="Change Phone Number"
          textColor={error === -1 ? '#b9b9b9' : Colors.secondary}
          style={styles.changePhoneNumberButton}
          buttonStyle={error === -1 ? [roundWrapButtonStyle, borderDisabled] : [roundWrapButtonStyle, borderSecondary]}
        />
        <Text style={styles.otpCodeLabel}>OTP CODE</Text>
        <View style={[flexCol, relative]}>
          <TextInputMask
            type={'custom'} 
            options={{
              mask: '999-999',
              validator: validatePhoneNumber
            }}
            value={otpcode}
            onChangeText={ text => setOtpcode(text) }
            style={textInput}
            placeholder="Enter Code"
            autoCompleteType="tel"
            keyboardType="numeric"
            textContentType="telephoneNumber"
          />
          <Image 
            style={styles.checkCircle}
            source={error === -1 ? IMAGES_PATH.checked : IMAGES_PATH.unchecked} 
          />
        </View>
        <Text style={styles.checkCodeLabel}>
          <AntIcon name="exclamationcircleo" />  Check your phone for the OTP Code.
        </Text>
        { error !== -1 &&  leftTime > 0 &&
          <Text>{leftTime} sec</Text>
        }
        <GradientButton 
          onPress={handleChangePhoneNumber}
          gradientColors={['white', 'white']}
          text="Resend Code"
          textColor={error === -1 ? '#b9b9b9' : Colors.secondary}
          style={styles.changePhoneNumberButton}
          buttonStyle={error === -1 ? [roundWrapButtonStyle, borderDisabled] : [roundWrapButtonStyle, borderSecondary]}
        />
      </View>
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

export default OtpCode;
