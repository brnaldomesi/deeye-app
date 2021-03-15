import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';
import reduxSaga from 'redux-saga';
import { wrap } from 'lodash-es';
import { getUserAgentSync } from 'react-native-device-info';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between'
  },

  body: {
    padding: 20
  },

  item_category: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: Size(1),
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    elevation: 1,
    width: '100%',
    marginBottom: 10
  },

  item_image: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: Size(2),
    width: Size(2),
  },

  item_text: {
  },

  item_text_bottom: {
    fontSize: 10,
    color: 'gray'
  },

  item_text_group: {
    paddingVertical: 10,
    paddingRight: 20,
    flexShrink: 1
  },

  item_content: {
    borderRadius: Size(1),
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    elevation: 1,
    marginBottom: 20
  },

  top_image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1389/737
  },

  top_text: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
    backgroundColor: '#05174f',
    position: 'absolute',
    bottom: 0,
  },

  image_flex: {
    display: 'flex',
    flexDirection: 'row',
    width: Size(5),
    flexShrink: 1
  },

  line_between: {
    width: Size(4),
  }

});

export default styles;
