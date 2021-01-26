import * as types from './types'

import {
  createCommentForCommentSuccess,
  getCommentsForCommentSuccess,
  updateCommentSuccess
} from './actions'
import { put, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { updatePostSuccess } from 'src/redux/modules/posts';

const getCommentsForComment = apiCallSaga({
  type: types.GET_COMMENTS_FOR_COMMENT,
  method: 'get',
  allowedParamKeys: [],
  path: ({payload}) => `/comments/${payload.id}/comments`,
  selectorKey: 'commentsForComment',
  success: function*(payload) {
    yield put(getCommentsForCommentSuccess(payload.data))
  },
})

const createCommentForComment = apiCallSaga({
  type: types.CREATE_COMMENT_FOR_COMMENT,
  method: 'post',
  allowedParamKeys: [],
  path: ({payload}) => `/comments/${payload.id}/comments`,
  selectorKey: 'commentsForComment',
  success: function*(payload) {
    yield put(createCommentForCommentSuccess(payload))
  },
})

const createCommentForPost = apiCallSaga({
  type: types.CREATE_COMMENT_FOR_POST,
  method: 'post',
  allowedParamKeys: [],
  path: ({payload}) => `/posts/${payload.id}/comments`,
  selectorKey: 'comment',
  success: function*(payload, action) {
    yield put(updatePostSuccess(payload))
  }
})

const likeComment = apiCallSaga({
  type: types.LIKE_COMMENT,
  method: 'put',
  allowedParamKeys: [],
  path: ({payload}) => `/comments/${payload.id}/like`,
  selectorKey: 'comment',
  success: function*(payload, action) {
    yield put(updateCommentSuccess(payload))
  }
})

export default function* rootSaga() {
  yield takeLatest(types.GET_COMMENTS_FOR_COMMENT, getCommentsForComment)
  yield takeLatest(types.CREATE_COMMENT_FOR_COMMENT, createCommentForComment)
  yield takeLatest(types.CREATE_COMMENT_FOR_POST, createCommentForPost)
  yield takeLatest(types.LIKE_COMMENT, likeComment)
}
