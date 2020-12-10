import {
  Colors,
  Size,
  borderPrimary,
  flexRowDirection,
  gradientColors,
  loginHorizontalPadding,
  loginTextInput,
  marginVerticalAuto,
  positionRelative,
  roundRectFullWidthButtonStyle
} from 'src/styles';
import {
  Image,
  Text,
  View
} from 'react-native';
import React, { useState } from 'react';
import {
  hasLowerCase,
  hasNumber,
  hasPunctuation,
  hasUpperCase
} from 'src/utils/helpers';

import GradientButton from 'src/components/GradientButton';
import { IMAGES_PATH } from 'src/config/constants';
import MyTextInput from 'src/components/MyTextInput';
import styles from './styles';

const rules = {
  longerThanEight: { value: false, label: 'At least 8 Characters long' },
  uppercaseContain:  { value: false, label: 'Contains uppercase letteres' },
  lowercaseContain:  { value: false, label: 'Contains lowercase letters' },
  numberContain:  { value: false, label: 'Contains numbers' },
  punctuationContain:  { value: false, label: 'Contains Punctuation' }
}

const Password = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdRuleError, setPwdRuleError] = useState(true);
  const [pwdMismatcherror, setPwdMismatchError] = useState(false);
  const [pwdRules, setPwdRules] = useState(rules);

  const handleConfirm = () => {
    
  };

  const validatePassword = text => {
    setPassword(text);
    if(text.length >= 8) {
      rules.longerThanEight.value = true;
    } else {
      rules.longerThanEight.value = false;
    }
    
    rules.uppercaseContain.value = hasUpperCase(text);
    rules.lowercaseContain.value = hasLowerCase(text);
    rules.numberContain.value = hasNumber(text);
    rules.punctuationContain.value = hasPunctuation(text);

    const pwdRuleErrorValue = !(rules.longerThanEight.value && 
                              rules.uppercaseContain.value &&
                              rules.lowercaseContain.value &&
                              rules.numberContain.value &&
                              rules.punctuationContain.value)
    setPwdRules(rules);
    setPwdRuleError(pwdRuleErrorValue);
    setPwdMismatchError(text !== confirmPassword);
  };
  
  const checkPasswordMatch = text => {
    setConfirmPassword(text);
    setPwdMismatchError(password !== text);
  };

  const ruleSection = Object.keys(pwdRules).map((rule, index) => (
    <View style={[flexRowDirection, positionRelative]} key={index}>
      <View style={marginVerticalAuto}>
        <Image 
          style={styles.smallCheckCircle}
          source={pwdRules[rule].value ? IMAGES_PATH.checked : IMAGES_PATH.unchecked} 
        />
      </View>
      <View style={[{ marginLeft: Size() }, marginVerticalAuto]}>
        <Text>{pwdRules[rule].label}</Text>
      </View>
    </View>
  ))
  
  return (
    <View style={loginHorizontalPadding}>
      <Text style={styles.passwordLabel}>Password</Text>
      <MyTextInput 
        placeholder="Enter Your Password"
        name="password"
        style={loginTextInput}
        value={password}
        onChangeText={ text => validatePassword(text) }
        secureTextEntry
        autoCompleteType="password" 
        textContentType="password"
        autoFocus
        fullWidth
      />
      <View style={styles.ruleSection}>{ruleSection}</View>
      <Text style={styles.passwordLabel}>Confirm Password</Text>
      <View style={[flexRowDirection, positionRelative]}>
        <MyTextInput 
          placeholder="Confirm your password"
          name="confirmPassword"
          style={loginTextInput}
          value={confirmPassword}
          onChangeText={ text => checkPasswordMatch(text) }
          secureTextEntry
          autoCompleteType="password" 
          textContentType="password"
          fullWidth
        />
        {!pwdRuleError && !pwdMismatcherror &&
          <Image 
            style={styles.checkCircle}
            source={IMAGES_PATH.checked} 
          />
        }
      </View>
      <GradientButton 
        onPress={handleConfirm}
        gradientColors={!pwdRuleError && !pwdMismatcherror  ? gradientColors : ['white', 'white']}
        text="Confirm"
        textColor={!pwdRuleError && !pwdMismatcherror ? 'white' : Colors.button.primary}
        fontSize={Size(1.2)}
        fontWeight="bold"
        style={styles.confirmButton}
        buttonStyle={!pwdRuleError && !pwdMismatcherror ? roundRectFullWidthButtonStyle : [roundRectFullWidthButtonStyle, borderPrimary]}
      />
    </View>
  )
};

export default Password;
