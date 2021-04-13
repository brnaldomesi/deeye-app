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
    [types.GET_POSTS_LIST_MORE_SUCCESS]: (state, { payload }) => ({
      ...state,
      postsList: state.postsList.concat(payload)
    }),
    [types.GET_POSTS_LIST_FAIL]: (state, { payload }) => {
      return {
        ...state,
        postsList: []
      }
    },
    [types.CREATE_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      postsList: concat([payload], state.postsList)
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
    },
    [types.UPDATE_FOLLOW_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        postsList: state.postsList.map(post => {
          if (post.author.user_id === payload) {
            return {...post, follow_state: 1 - post.follow_state};
          } else {
            return post;
          }
        })
      }
    },
    [types.DELETE_FILE_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        postsList: state.postsList.map(post => {
          if (post.id === payload.post_id) {
            return {...post, post_attachments: post.post_attachments.filter((item) => {
              if (item.id !== payload.id) {
                return item;
              }})}
          } else {
            return post;
          }
        })
      }
    }
  },
  getInitialState()
);
