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

  alert_color_white: {
    borderColor: 'white',
  },

  alert_color_large_default: {
    borderColor: '#b71c1c',
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
  },

  m_auto: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginStart: 'auto',
    marginEnd: 'auto',
  },

  large_item: {
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#aaaaaa'
  },

  large_top_item: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: Size(10),
    width: '100%',
  },

  large_bottom_item: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: Size(3),
    width: '100%',
    backgroundColor: '#f1f9ff',
  },

  large_leftImg: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: Size(6),
    flexShrink: 1,
  },

  large_vwImg: {
    width: Size(3.5),
    maxHeight: Size(3.5),
    marginTop: 'auto',
    marginBottom: 'auto',
    marginStart: 'auto',
    marginEnd: 'auto',
    flexGrow: 1,
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: Size(1.75),
  },

  large_badgeImg: {
    width: Size(.7),
    height: Size(.7),
    position: 'absolute',
    bottom: Size(.2),
    right: Size(.2)
  },

  large_badgeBtn: {
    height: Size(.8),
    position: 'absolute',
    bottom: Size(2),
    left: Size(1.7),
    borderRadius: Size(.4),
    overflow: 'hidden',
  },

  large_badgeBtn_small: {
    backgroundColor: '#77c545',
    height: Size(.8),
    paddingTop: 0,
    paddingBottom: 0,
  },

  text_white: {
    color: 'white',
    fontSize: 9
  },

  large_contentText: {
    flexBasis: 1,
    flexGrow: .7,
    paddingTop: 10,
    paddingBottom: 10,
  },

  large_text_top_content: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  text_missing_color: {
    color: '#b71c1c',
  },

  text_found_color: {
    color: '#4cb906',
  },

  large_text_bottom_content: {
    marginBottom: 5,
    color: '#767676',
    fontSize: 16,
    fontWeight: 'bold'
  },

  large_text_content: {
    color: '#999999',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  large_text_verifed: {
    backgroundColor: '#e8ffed',
    padding: 5,
    marginEnd: 'auto',
    borderRadius: 3,
    fontSize: 10,
    color: '#74cb42'
  },

  large_text_account_first: {
    color: '#999999',
    fontSize: 9,
  },

  large_text_account_last: {
    color: '#478cd1',
    fontSize: 9,
  },

  verifed_img: {
    width: Size(1),
    height: Size(1),
    overflow: 'hidden',
    borderRadius: Size(.5),
  },

  large_settingImg: {
    width: Size(.2),
    height: Size(1),
    marginTop: 10,
    marginBottom: 'auto',
    resizeMode: 'contain',
    marginEnd: 10
  },

  uploadImg: {
    marginStart: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginEnd: 20,
    width: Size(1),
    height: Size(1),
    resizeMode: 'contain',
  },

  uploadText: {
    fontSize: 10,
    color: '#478cd1',
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  large_bottom_contentText: {
    flexBasis: 1,
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },

  large_bottom_verify_contentText: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  bottom_uploadImg: {
    width: Size(1),
    height: Size(1),
    resizeMode: 'contain',
  },

  bottom_uploadText: {
    fontSize: 10,
    color: '#478cd1',
  },

  share_content: {
    margin: 10,
    height: Size(3.5),
    backgroundColor: '#e8ffed',
    borderWidth: 1,
    borderColor: '#73ca40',
    borderStyle: 'solid',
    borderRadius: 10,
  },

  share_vwImg: {
    marginLeft: -20,
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: Size(1.25),
  },

  shareImg: {
    width: Size(2.5),
    height: Size(2.5),
    resizeMode: 'contain',
  },

});

export default styles;
