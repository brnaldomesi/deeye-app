import * as types from './types'

import {
  createPostSuccess,
  deletePostSuccess,
  getPostsListFail,
  getPostsListSuccess,
  togglePostVisibilitySuccess,
  updatePostSuccess
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

const togglePostVisibility = apiCallSaga({
  type: types.TOGGLE_POST_VISIBILITY,
  method: 'put',
  allowedParamKeys: [],
  path: ({payload}) => `/posts/${payload.id}`,
  selectorKey: 'post',
  success: function*(payload, action) {
    yield put(togglePostVisibilitySuccess(payload))
  }
})

const deletePost = apiCallSaga({
  type: types.DELETE_POST,
  method: 'delete',
  allowedParamKeys: [],
  path: ({payload}) => `/posts/${payload.id}`,
  selectorKey: 'post',
  success: function*(payload, action) {
    yield put(deletePostSuccess(payload))
  }
})

const uploadFile = apiCallSaga({
  type: types.UPLOAD_FILE,
  method: 'post',
  allowedParamKeys: [],
  path: '/attachments',
  selectorKey: 'uploadedFile',
})

const updatePost = apiCallSaga({
  type: types.UPDATE_POST,
  method: 'put',
  allowedParamKeys: [],
  path: ({payload}) => `/posts/${payload.id}`,
  selectorKey: 'post',
  success: function*(payload, action) {
    yield put(updatePostSuccess(payload))
  }
})

export default function* rootSaga() {
  yield takeLatest(types.GET_POSTS_LIST, getPostsList)
  yield takeLatest(types.CREATE_POST, createPost)
  yield takeLatest(types.UPLOAD_FILE, uploadFile)
  yield takeLatest(types.TOGGLE_POST_VISIBILITY, togglePostVisibility)
  yield takeLatest(types.DELETE_POST, deletePost)
  yield takeLatest(types.UPDATE_POST, updatePost)
}
