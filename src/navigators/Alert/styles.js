import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  contentText: {
    display: 'flex',
    flexDirection: 'row',
    flexBasis: 1,
    flexGrow: .7,
  },

  timeText: {
    flexBasis: 1,
    flexGrow: .3
  },

  simple_item: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: Size(4),
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#aaaaaa'
  },

  scroll_view: {
    width: '100%',
  },

  text_name: {
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#2074c8',
    fontWeight: 'bold',
    flexBasis: 1,
    flexGrow: .4
  },

  d_flex: {
    display: 'flex',
    flexDirection: 'row',
  },

  text_content: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flexBasis: 1,
    flexGrow: 1
  },

  text_min: {
    marginTop: 'auto',
    marginBottom: 5,
    marginStart: 'auto',
    marginEnd: 'auto',
    paddingStart: 10,
    fontSize: 9,
    color: '#999999',
  },

  settingImg: {
    width: Size(.2),
    height: Size(1),
    marginTop: 'auto',
    marginBottom: 5,
    resizeMode: 'contain',
    marginEnd: 10
  },

  settingTouch: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 5,
  },

  settingText: {
    borderRadius: Size(.7),
    borderStyle: 'solid',
    borderColor: '#2074c8',
    borderWidth: 1,
    lineHeight: Size(1.4),
    textAlign: 'center',
    color: '#2074c8',
    width: '90%',
    height: Size(1.4),
    marginTop: 'auto',
    marginBottom: 5,
    resizeMode: 'contain',
    marginEnd: 10,
    fontSize: 11
  },

  name_primary: {
    fontWeight: 'bold',
    color: '#2074c8',
  },

  vwImg: {
    width: Size(2.5),
    maxHeight: Size(2.5),
    marginTop: 'auto',
    marginBottom: 'auto',
    marginStart: 'auto',
    marginEnd: 'auto',
    flexGrow: 1,
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: Size(1.25),
  },

  alert_color_red: {
    borderColor: '#e84343',
  },

  alert_color_brown: {
    borderColor: '#edaa6b',
  },

  alert_color_blue: {
    borderColor: '#4448a4',
  },

  alert_color_green: {
    borderColor: '#77c545',
  },

  alert_color_sky: {
    borderColor: '#5cacef',
  },

  circleImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  badgeImg: {
    width: Size(1.2),
    height: Size(1.2),
    position: 'absolute',
    bottom: Size(.7),
    right: Size(.6)
  },

  rightImg: {
    flexGrow: 1,
    marginStart: 'auto',
  },

  leftImg: {
    minWidth: Size(4),
    flexShrink: 1,
  }
});

export default styles;
