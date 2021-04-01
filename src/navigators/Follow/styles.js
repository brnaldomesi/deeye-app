import {absolute, Colors, Size} from 'src/styles';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  navbar: {
    height: Size(7),
    width: '100%',
    backgroundColor: 'white'
  },

  d_flex: {
    display: 'flex',
  },

  m_auto: {
    marginVertical: 'auto',
    marginHorizontal: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  centerImg: {
    width: Size(3.5),
    maxHeight: Size(3.5),
    borderWidth: 2,
    borderRadius: Size(1.75),
    borderColor: '#05174f',
    marginStart: 'auto',
    marginEnd: 'auto'
  },

  avatarImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  avatarText: {
    color: '#05174f',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center'
  },

  cancelButton: {
    position: 'absolute',
    top: Size(2),
    left: 20
  },

  tapBar: {
    height: Size(3),
    backgroundColor: '#f1f6fb',
    display: 'flex',
    flexDirection: 'row'
  },

  tapBarBtn: {
    flexGrow: 1,
    height: '100%',
  },

  itemBtnRemove: {
    fontSize: 12,
    color: '#051744'
  },

  itemBtnFollow: {
    fontSize: 12,
    color: 'white',
    backgroundColor: '#051744',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  itemBtnSetting: {
    height: Size(1),
    resizeMode: 'contain',
    marginLeft: 'auto'
  },

  itemBtnSettingParent: {
    width: Size(2),
  },

  searchBar: {},

  searchBarParent: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#f1f6fb',
    height: Size(2.5),
    borderRadius: Size(1.25),
    borderColor: '#051744',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row'
  },

  searchBtn: {
    width: Size(1),
    height: '100%',
    resizeMode: 'contain',
    marginStart: Size(1),
  },

  closeBtn: {
    width: Size(1),
    marginHorizontal: 10,
    height: '100%',
    resizeMode: 'contain',
  },

  searchBarInput: {
    height: Size(2.5),
    fontSize: 15,
    flex: 1,
  },

  bottomPopup: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: Size(1),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  bottomPopupAvatarView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: Size(-2),
  },

  bottomPopupAvatar: {
    width: Size(4),
    height: Size(4),
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  bottomPopupTitle: {
    display: 'flex',
    flexDirection: 'row',
  },

  bottomPopupDetail: {
    marginStart: 'auto',
    marginEnd: 'auto',
    marginTop: Size(0)
  },

  bottomPopupParent: {
    alignItems: 'center',
  },

  bottomPopupFollowingParent: {
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#051744'
  },

  bottomPopupFollowing: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 10,
    color: '#051744'
  },

  bottomPopupCancel: {
    padding: 10,
  },

  bottomPopupName: {
    fontSize: Size(1.5),
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center'
  },

  bottomPopupEmail: {
    fontSize: Size(.8),
    color: '#666666',
    textAlign: 'center'
  },

  bottomPopupUnder: {
    fontSize: Size(.8),
    color: '#666666',
    textAlign: 'center'
  },

  bottomImg: {
    width: Size(2.5),
    height: Size(2.5),
    resizeMode: 'contain',
  },

  bottomImgText: {
    paddingTop: 5,
    fontSize: Size(.7),
    color: '#021744',
    textAlign: 'center'
  },

  center: {
    alignItems: 'center'
  },

  d_flex_row: {
    display: 'flex',
    flexDirection: 'row'
  }

});

export default styles;