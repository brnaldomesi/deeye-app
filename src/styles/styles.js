import { Colors, Size } from './constants';

export const gradientColors = [Colors.gradient.primary, Colors.gradient.secondary, Colors.gradient.third];

export const roundWrapButtonStyle = {
  borderRadius: Size(2),
  paddingHorizontal: Size(0.5),
  paddingVertical: Size(0.5),
}

export const roundMediumSizeButtonStyle = {
  borderRadius: Size(2),
  paddingHorizontal: Size(3),
  paddingVertical: Size(0.6),
}

export const roundRectFullWidthButtonStyle = {
  borderRadius: Size(),
  width: '100%',
  alignItems: 'center',
  paddingVertical: Size()
}

export const borderPrimary = {
  borderColor: Colors.button.primary,
  borderWidth: 1,
}

export const borderSecondary = {
  borderColor: Colors.button.secondary,
  borderWidth: 1,
}

export const borderDisabled = {
  borderColor: Colors.divider,
  borderWidth: 1,
}

/* Layout */
export const flexOne = {
  flex: 1
}

/* Background */
export const bgButtonPrimary = {
  backgroundColor: Colors.button.primary
}

export const bgSecodary = {
  backgroundColor: Colors.button.secodary
}

export const bgWhite = {
  backgroundColor: 'white'
}

export const loginHeaderStyle = {
  borderTopLeftRadius: Size(),
  borderTopRightRadius: Size(),
  alignItems: 'center',
  flex: 1
}

export const basicPadding = {
  marginTop: Size(1.5),
  marginBottom: Size(1.5),
  marginLeft: Size(1.5),
  marginRight: Size(1.5),
}

export const loginHorizontalPadding = {
  paddingLeft: Size(3.5),
  paddingRight: Size(3.5)
}

export const flexRowDirection = {
  flexDirection: 'row'
}

export const alignItemsCenter = {
  alignItems: 'center'
}

export const flexGrowOne = {
  flexGrow: 1
}

export const marginVerticalAuto = {
  marginTop: 'auto',
  marginBottom: 'auto'
}

export const loginTextInput = {
  borderColor: Colors.button.primary,
  borderWidth: 1,
  borderRadius: Size(.5),
  paddingHorizontal: Size(),
  height: Size(2.5)
}

export const positionRelative = {
  position: 'relative'
}

export const fontWeightBold = {
  fontWeight: 'bold'
}

export const whiteColor = {
  color: 'white'
}

export const primaryColor = {
  color: Colors.button.primary
}

export const secondaryColor = {
  color: Colors.button.secondary
}

export const textBase = {
  fontSize: Size()
}

export const textXl = {
  fontSize: Size(1.2)
}

export const ml = {
  marginLeft: Size()
}

export const p1 = {
  padding: Size()
}

export const px1 = {
  paddingHorizontal: Size()
}

export const py1 = {
  paddingVertical: Size()
}

export const my1 = {
  marginVertical: Size()
}

export const justifyAround = {
  justifyContent: 'space-around'
}
