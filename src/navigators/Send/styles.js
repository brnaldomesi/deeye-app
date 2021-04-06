import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  d_flex: {
    display: 'flex',
    flexDirection: 'row',
  },

  m_auto: {
    marginVertical: 'auto',
    marginHorizontal: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  searchBarParent: {
    marginVertical: 'auto',
    marginHorizontal: 10,
    backgroundColor: '#f1f6fb',
    height: Size(2.5),
    borderRadius: Size(1.25),
    borderColor: '#051744',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1
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

  itemSend: {
    fontSize: 12,
    color: 'white',
    backgroundColor: '#051744',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
});

export default styles;
