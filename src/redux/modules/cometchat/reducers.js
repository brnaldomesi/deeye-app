import * as types from './types'

import { handleActions } from 'redux-actions'

const getInitialState = () => ({
  user: {},
  isLoggedIn: false,
  error: null,
  loading: false,
  authRedirectPath: '/',
});

export default handleActions(
  {
    [types.COMET_CHAT_LOGIN_START]: (state, action) => ({
      ...state,
      error: null,
      loading: true,
    }),
    [types.COMET_CHAT_LOGIN_SUCCESS]: (state, { payload }) => {

      return {
        ...state,
        user: payload,
        error: null,
        isLoggedIn: true,
        loading: false
      }
    },
    [types.COMET_CHAT_LOGIN_FAIL]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    })
  },
  getInitialState()
)
