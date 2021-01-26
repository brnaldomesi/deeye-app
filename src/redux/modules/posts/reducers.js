import * as types from './types'

import concat from 'lodash/concat'
import { handleActions } from 'redux-actions'

const getInitialState = () => ({
  postsList: [],
})

export default handleActions(
  {
    [types.GET_POSTS_LIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      postsList: payload
    }),
    [types.GET_POSTS_LIST_FAIL]: (state, { payload }) => {
      return {
        ...state,
        postsList: []
      }
    },
    [types.CREATE_POST_SUCCESS]: (state, { payload }) => ({
      ...state, 
      postsList: concat(state.postsList, [payload])
    }),
    [types.DELETE_POST_SUCCESS]: (state, { payload }) => ({
      ...state, 
      postsList: state.postsList.filter(post => post.id != payload.id)
    }),
    [types.UPDATE_POST_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        postsList: state.postsList.map(post => post.id === payload.id ? payload : post)
      }
    }
  },
  getInitialState()
);
