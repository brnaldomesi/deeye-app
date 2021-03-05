import { heightRatio, widthRatio } from '../../../utils/consts';

import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';
import theme from '../../../resources/theme';

export default StyleSheet.create({
  callMessageStyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  callMessageTxtStyle: {
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: '500',
    margin: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 75,
    paddingHorizontal: 12,
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    color: theme.color.blue,
  },
  headerDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  audioCallContainer: {
    paddingRight: 2,
  },
  videoCallContainer: {
    paddingRight: 5,
  },
  callIcon: {
    width: Size(2),
    height: Size(2),
  },
  itemDetailContainer: {
    flex: 1,
    alignItems: 'center'
    // marginLeft: 80 * widthRatio,
  },
  itemNameText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusText: {
    fontSize: 14,
    color: theme.color.blue,
    // marginLeft: 10,
  },
  avatarContainer: {
    height: 32 * heightRatio,
    width: 38 * widthRatio,
    borderRadius: 25,
    marginRight: 12,
  },
});
