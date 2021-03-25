import { size } from 'lodash-es';
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
  borderColor: Colors.primary,
  borderWidth: 1,
}

export const borderSecondary = {
  borderColor: Colors.secondary,
  borderWidth: 1,
}

export const borderDisabled = {
  borderColor: Colors.divider,
  borderWidth: 1,
}

export const borderRed = {
  borderWidth: 1,
  borderColor: 'red'
}

export const borderGreen1 = {
  borderWidth: 1,
  borderColor: Colors.green1
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

export const textInput = {
  borderColor: Colors.primary,
  borderWidth: 1,
  borderRadius: Size(.5),
  paddingHorizontal: Size(),
  height: Size(2.5)
}

export const textInputRed = {
  borderColor: 'red',
  borderWidth: 1,
  borderRadius: Size(.5),
  paddingHorizontal: Size(),
  height: Size(2.5),
  color: 'red'
}

export const resizeCover = {
  resizeMode: 'cover'
}

export const resizeContain = {
  resizeMode: 'contain'
}

export const w80P = {
  width: '80%'
}

export const wFull = {
  width: '100%'
}

/* Layout */
export const flexOne = {
  flex: 1
}

export const flexRow = {
  flexDirection: 'row'
}

export const flexGrowOne = {
  flexGrow: 1
}

/* Background */
export const bgPrimary = {
  backgroundColor: Colors.primary
}

export const bgSecodary = {
  backgroundColor: Colors.secodary
}

export const bgWhite = {
  backgroundColor: 'white'
}

export const bgDivider = {
  backgroundColor: Colors.divider
}

export const bgBottomPrimary = {
  backgroundColor: Colors.postBottom.primary
}

export const bgBlack = {
  backgroundColor: 'black'
}

export const bgTransparent = {
  backgroundColor: 'transparent'
}

/* Position */
export const relative = {
  position: 'relative'
}

export const absolute = {
  position: 'absolute'
}

export const left0 = {
  left: 0
}

export const right0 = {
  right: 0
}

export const bottom0 = {
  bottom: 0
}

/* Font */
export const fontWeightBold = {
  fontWeight: 'bold'
}

export const italic = {
  fontStyle: 'italic'
}

export const textWhite = {
  color: 'white'
}

export const textBlack = {
  color: 'black'
}

export const textRed = {
  color: 'red'
}

export const textYellow100 = {
  color: Colors.yellow100
}

export const textGreen1 = {
  color: Colors.green1
}

export const primaryColor = {
  color: Colors.primary
}

export const secondaryColor = {
  color: Colors.secondary
}

export const grayColor = {
  color: 'gray'
}

export const textDot5 = {
  fontSize: Size(.6)
}

export const textDot7 = {
  fontSize: Size(.7)
}

export const textBase = {
  fontSize: Size()
}

export const textXl = {
  fontSize: Size(1.2)
}

//Margin & Padding
export const myAuto = {
  marginTop: 'auto',
  marginBottom: 'auto'
}

export const mxAuto = {
  marginLeft: 'auto',
  marginRight: 'auto'
}

export const m0 = {
  margin: 0
}

export const mt1 = {
  marginTop: Size()
}

export const mt2 = {
  marginTop: Size(2)
}

export const mtp5 = {
  marginTop: 5
}

export const mrAuto = {
  marginRight: 'auto'
}

export const ml1 = {
  marginLeft: Size()
}

export const mlp5 = {
  marginLeft: 5
}

export const mlSm = {
  marginLeft: Size(.5)
}

export const my1 = {
  marginVertical: Size()
}

export const myp5 = {
  marginVertical: 5
}

export const mx1 = {
  marginHorizontal: Size()
}

export const mb2= {
  marginBottom: Size(2)
}

export const mb_message= {
  marginBottom: Size(-0.2),
  paddingTop: Size(0.2)
}

export const p0 = {
  padding: 0
}

export const p1 = {
  padding: Size()
}

export const pp5 = {
  padding: 5
}

export const pDot7 = {
  padding: Size(.7)
}

export const pl1 = {
  paddingLeft: Size()
}

export const pyXs = {
  paddingVertical: Size(.3)
}

export const pxDot7 = {
  paddingHorizontal: Size(.7)
}

export const pyDot7 = {
  paddingVertical: Size(.7)
}

export const pyDot5 = {
  paddingVertical: Size(.5)
}

export const pyp5 = {
  paddingVertical: 5
}

export const px1 = {
  paddingHorizontal: Size(1)
}

export const pxp5 = {
  paddingHorizontal: 5
}

export const px2 = {
  paddingHorizontal: Size(2)
}

export const py1 = {
  paddingVertical: Size()
}

export const pt1 = {
  paddingTop: Size()
}

/* Align */
export const itemsCenter = {
  alignItems: 'center'
}

export const itemsStart = {
  alignItems: 'flex-start'
}

export const itemsEnd = {
  alignItems: 'flex-end'
}

export const selfCenter = {
  alignSelf: 'center'
}

export const justifyAround = {
  justifyContent: 'space-around'
}

export const justifyCenter = {
  justifyContent: 'center'
}

export const justifyBetween = {
  justifyContent: 'space-between'
}

export const textCenter = {
  textAlign: 'center'
}

/* Border */
export const roundedFull = {
  borderRadius: Size(15)
}

export const roundedSm = {
  borderRadius: Size(.5)
}

export const rounded1 = {
  borderRadius: Size()
}

export const borderWhite = {
  borderColor: 'white'
}

export const border1 = {
  borderWidth: 1
}

/* Flex Wrap */
export const flexWrap = {
  flexWrap: 'wrap'
}

export const opacity40 = {
  opacity: 0.4
}

/* flex */
export const d_flex = {
  display: 'flex',
  flexDirection: 'row',
}

export const ml_auto = {
  marginLeft: 'auto'
}

export const mr_auto = {
  marginRight: 'auto'
}


