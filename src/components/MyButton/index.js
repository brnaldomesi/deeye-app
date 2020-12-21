import {
  Size,
  bgButtonPrimary,
  bgButtonSecondary,
  borderSecondary,
  secondaryColor,
  whiteColor
} from 'src/styles';
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import React from 'react';

const variants = {
  primary: bgButtonPrimary,
  // danger: CustomStyles.
  secondary: bgButtonSecondary,
  nobg: { backgroundColor: '#ffff' }
}

const MyButton = ({ 
  style, 
  title, 
  block, 
  variant, 
  children, 
  onPress,
  outlined, 
  ...rest
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.container,
      block && styles.block,
      variants[variant],
      outlined && borderSecondary,
      style
    ]}
    {...rest}
  >
    {children ? children : (
      <Text center style={ variant === 'primary' ? whiteColor : secondaryColor }>{title}</Text>
    )}
  </TouchableOpacity>
)

export default ({ link, ...rest }) =>
  link ? (
    <MyButton {...rest} />
  ) : (
    <MyButton {...rest} />
  )

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  block: {
    flex: 1
  }
});
