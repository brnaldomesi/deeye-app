import * as types from './types'

import {
  createPostSuccess,
  getPostsListFail,
  getPostsListSuccess
} from './actions'
import { put, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'

const getPostsList = apiCallSaga({
  type: types.GET_POSTS_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: '/posts',
  selectorKey: 'postsList',
  success: function*(payload) {
    yield put(getPostsListSuccess(payload))
  },
  fail: function*(payload) {
    yield put(getPostsListFail(payload))
  }
})

const createPost = apiCallSaga({
  type: types.CREATE_POST,
  method: 'post',
  allowedParamKeys: [],
  path: '/posts',
  selectorKey: 'post',
  success: function*(payload, action) {
    yield put(createPostSuccess(payload))
  }
})

const uploadFile = apiCallSaga({
  type: types.UPLOAD_FILE,
  method: 'post',
  allowedParamKeys: [],
  path: '/attachments',
  selectorKey: 'uploadedFile',
})

export default function* rootSaga() {
  yield takeLatest(types.GET_POSTS_LIST, getPostsList)
  yield takeLatest(types.CREATE_POST, createPost)
  yield takeLatest(types.UPLOAD_FILE, uploadFile)
}
