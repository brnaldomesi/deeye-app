import * as postTypes from 'src/redux/modules/posts/types';
import * as types from './types'

import concat from 'lodash/concat'
import { handleActions } from 'redux-actions';
import unionBy from 'lodash/unionBy'

const getInitialState = () => ({
  commentsList: [],
})

export default handleActions(
  {
    [postTypes.UPDATE_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      commentsList: payload.recent_comments
    }),
    [types.GET_COMMENTS_FOR_COMMENT_SUCCESS]: (state, { payload }) => ({
      ...state,
      commentsList: unionBy(payload, state.commentsList, 'id')
    }),
    [types.CREATE_COMMENT_FOR_COMMENT_SUCCESS]: (state, { payload }) => ({
      ...state,
      commentsList: concat([payload], state.commentsList)
    }),
    [types.UPDATE_COMMENT_SUCCESS]: (state, { payload }) => ({
      ...state,
      commentsList: state.commentsList.map(comment => comment.id === payload.id ? payload : comment)
    })
  }, 
  getInitialState()
);
