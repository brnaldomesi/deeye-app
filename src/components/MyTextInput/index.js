import {
  Text,
  TextInput,
  View
} from 'react-native';

import { Colors } from 'src/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { flexOne } from 'src/styles';
import { getValidationErrorString } from 'src/utils/helpers';

const MyTextInput = ({
  placeholder,
  style,
  value,
  onChangeText,
  error,
  keyboardType,
  autoCompleteType,
  textContentType,
  autoFocus,
  onBlur,
  name,
  fullWidth,
  secureTextEntry
}) => {
  
  return (
    <View style={fullWidth ? {width : '100%'} : undefined}>
      <TextInput
        placeholder={placeholder}
        style={style}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        autoCompleteType={autoCompleteType}
        textContentType={textContentType}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
      {error === 1 && <Text style={{ color: Colors.text.danger }}>{getValidationErrorString(name)}</Text>}
    </View>
  )
};

MyTextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  error: PropTypes.number,
  keyboardType: PropTypes.string,
  autoCompleteType: PropTypes.string,
  textContentType: PropTypes.string,
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  secureTextEntry: PropTypes.bool
}

export default MyTextInput;
