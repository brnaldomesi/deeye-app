import * as types from './types'

import concat from 'lodash/concat'
import { handleActions } from 'redux-actions'

const getInitialState = () => ({
  alertList: [],
  badgeCount: 0,
  isIntro: false,
});

export default handleActions(
  {
    [types.GET_ALERT_LIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      alertList: payload
    }),
    [types.GET_ALERT_LIST_FAIL]: (state, { payload }) => {
      return {
        ...state,
        alertList: []
      }
    },
    [types.SET_LOCATION]: (state, { payload }) => {
      return {
        ...state,
      }
    },
    [types.ADD_BADGE_COUNT]: (state, { payload }) => {
      return {
        ...state,
        badgeCount: state.badgeCount + payload
      }
    },
    [types.EMPTY_BADGE_COUNT]: (state, { payload }) => {
      return {
        ...state,
        badgeCount: 0
      }
    },
    [types.ADD_INTRO]: (state, { payload }) => {
      return {
        ...state,
        isIntro: payload
      }
    },
  },
  getInitialState()
);
