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

const UserInfo = ({ route, navigation, authCheckUser }) => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [errorFirst, setErrorFirst] = useState(0);
  const [errorLast, setErrorLast] = useState(0);

  const handleConfirm = () => {
    if (first === '') {
      setErrorFirst(-1);
    } else if (last === '') {
      setErrorLast(-1);
    } else {
      navigation.navigate('PasswordSet', {email : route.params.email, first: first, last: last});
    }
  }

  return (
    <View style={loginHorizontalPadding}>
      <Text style={styles.firstLabel}>Fist Name</Text>
      <View style={[flexRow, relative]}>
        <MyTextInput
          placeholder="Enter your first name"
          name="text"
          style={textInput}
          value={first}
          onChangeText={ text => {
            setFirst(text);
            setErrorFirst(0);
          }}
          error={errorFirst}
          keyboardType="default"
          autoCompleteType="name"
          autoFocus
          fullWidth
        />

        <Image
          style={styles.checkCircle}
          source={first !== '' ? IMAGES_PATH.checked : IMAGES_PATH.unchecked}
        />
      </View>
      <Text style={styles.lastLabel}>Last Name</Text>
      <View style={[flexRow, relative]}>
        <MyTextInput
          placeholder="Enter your last name"
          name="text"
          style={textInput}
          value={last}
          onChangeText={ text => {
            setLast(text);
            setErrorLast(0);
          }}
          error={errorLast}
          keyboardType="default"
          autoCompleteType="name"
          fullWidth
        />

        <Image
          style={styles.checkCircle}
          source={last !== '' ? IMAGES_PATH.checked : IMAGES_PATH.unchecked}
        />
      </View>
      <GradientButton
        onPress={handleConfirm}
        gradientColors={first !== '' && last !== '' ? gradientColors : ['white', 'white']}
        text="Confirm"
        textColor={first !== '' && last !== '' ? 'white' : Colors.primary}
        fontSize={Size(1.2)}
        fontWeight="bold"
        style={styles.confirmButton}
        buttonStyle={first !== '' && last !== '' ? [roundRectFullWidthButtonStyle] : [roundRectFullWidthButtonStyle, borderPrimary]}
      />
    </View>
  )
};

export default UserInfo;
