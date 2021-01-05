import {
  Size,
  bgButtonSecondary,
  bgPrimary,
  borderSecondary,
  flexCol,
  secondaryColor,
  textWhite
} from 'src/styles';
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import React from 'react';

const variants = {
  primary: bgPrimary,
  // danger: CustomStyles.
  secondary: bgButtonSecondary,
  nobg: { backgroundColor: '#ffff' }
}

const flexDirections = {
  row: flexCol
}

const MyButton = ({ 
  style, 
  title, 
  block, 
  variant, 
  children, 
  onPress,
  outlined,
  row, 
  ...rest
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.container,
      block && styles.block,
      variants[variant],
      outlined && borderSecondary,
      row && flexDirections[row],
      style
    ]}
    {...rest}
  >
    {children ? children : (
      <Text center style={ variant === 'primary' ? textWhite : secondaryColor }>{title}</Text>
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
    justifyContent: 'center',
  },
  block: {
    flex: 1
  }
});
