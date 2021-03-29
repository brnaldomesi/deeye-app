import * as types from './types'

import concat from 'lodash/concat'
import { handleActions } from 'redux-actions'

const getInitialState = () => ({
  followList: [],
});

export default handleActions(
  {
    [types.GET_FOLLOW_LIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      followList: payload
    }),
    [types.GET_FOLLOW_LIST_FAIL]: (state, { payload }) => {
      return {
        ...state,
        followList: []
      }
    },
    [types.REMOVE_FOLLOW]: (state, { payload }) => ({
      ...state,
      followList: state.followList.filter(item => item.id !== payload)
    }),
  },
  getInitialState()
);
