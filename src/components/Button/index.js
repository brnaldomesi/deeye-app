import { Size, bgPrimary } from 'src/styles'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import React from 'react'

const variants = {
  primary: bgPrimary,
  // danger: CustomStyles.
  nobg: { backgroundColor: '#ffff' }
}

const Button = ({ style, title, block, variant, children, ...rest }) => (
  <TouchableOpacity
    style={[
      styles.container,
      block && styles.block,
      variants[variant] || bgPrimary,
      style
    ]}
    activeOpacity={0.7}
    {...rest}
  >
    {children ? children : (
      <Text center style={styles.buttonText}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
)

export default ({ link, ...rest }) =>
  link ? (
    <Button {...rest} />
  ) : (
    <Button {...rest} />
  )

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Size(0.5),
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 50,
  },
  block: {
    flex: 1
  },
  buttonText: {
    color: 'white',
  }
})
