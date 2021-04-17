import {absolute, Colors, Size} from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  settingImg: {
    width: Size(1.4),
    height: Size(1.4),
    resizeMode: 'contain',
  },
  absolute: {
    position: 'absolute'
  },
  missingDays: {
    bottom: 0,
    right: 0,
    borderTopLeftRadius: Size(),
    paddingHorizontal: Size(.7),
    paddingVertical: Size(.2)
  },

  f_name: {
    fontSize: Size(1.6),
    backgroundColor: '#eeeeee',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5
  },

  f_title: {
    fontSize: Size(1),
  },

  f_detail: {
    fontSize: Size(0.8),
  },

  f_content: {
    fontSize: Size(.6),
    backgroundColor: '#eeeeee',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%'
  },

  f_report: {
    fontSize: Size(.6),
  },

  mt5: {
    marginTop: 5,
  },

  bottom_divider: {
    marginHorizontal: Size(0.2),
    marginVertical: Size(1)
  },

  selfCenter: {
    alignSelf: 'center'
  },

  w_half: {
    width: '50%'
  },

  w_70: {
    width: '70%'
  },

  w_30: {
    width: '30%'
  },

  height_name: {
    minHeight: Size(3),
    padding: 0,
    margin: 0,
  },

  height_number: {
    minHeight: Size(1),
    padding: 0,
    margin: 0,
    width: '90%',
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10
  }
});

export default styles;
