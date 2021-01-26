import * as types from './types'

import {
  createPostSuccess,
  deletePostSuccess,
  getPostsListFail,
  getPostsListSuccess,
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

const getPostsListForUnsigned = apiCallSaga({
  type: types.GET_POSTS_LIST_FOR_UNSIGNED,
  method: 'get',
  allowedParamKeys: [],
  path: '/posts/unsigned',
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

const hidePost = apiCallSaga({
  type: types.HIDE_POST,
  method: 'put',
  allowedParamKeys: [],
  path: ({payload}) => `/posts/${payload.id}/hide`,
  selectorKey: 'post',
  success: function*(payload, action) {
    yield put(deletePostSuccess(payload))
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

const reportPost = apiCallSaga({
  type: types.REPORT_POST,
  method: 'put',
  allowedParamKeys: [],
  path: ({payload}) => `/posts/${payload.id}/report`,
  selectorKey: 'post'
})

const savePost = apiCallSaga({
  type: types.SAVE_POST,
  method: 'put',
  allowedParamKeys: [],
  path: ({payload}) => `/posts/${payload.id}/save`,
  selectorKey: 'post',
  success: function*(payload, action) {
    yield put(updatePostSuccess(payload))
  }
})

const likePost = apiCallSaga({
  type: types.LIKE_POST,
  method: 'put',
  allowedParamKeys: [],
  path: ({payload}) => `/posts/${payload.id}/like`,
  selectorKey: 'post',
  success: function*(payload, action) {
    yield put(updatePostSuccess(payload))
  }
})

const sharePost = apiCallSaga({
  type: types.SHARE_POST,
  method: 'post',
  allowedParamKeys: [],
  path: ({payload}) => `/posts/${payload.id}/share`,
  selectorKey: 'post',
  success: function*(payload, action) {
    yield put(createPostSuccess(payload))
  }
})

const getPost = apiCallSaga({
  type: types.GET_POST,
  method: 'get',
  allowedParamKeys: [],
  path: ({payload}) => `/posts/${payload.id}`,
  selectorKey: 'post',
  success: function*(payload, action) {
    yield put(updatePostSuccess(payload));
  }
})

export default function* rootSaga() {
  yield takeLatest(types.GET_POSTS_LIST, getPostsList)
  yield takeLatest(types.GET_POSTS_LIST_FOR_UNSIGNED, getPostsListForUnsigned)
  yield takeLatest(types.CREATE_POST, createPost)
  yield takeLatest(types.UPLOAD_FILE, uploadFile)
  yield takeLatest(types.HIDE_POST, hidePost)
  yield takeLatest(types.DELETE_POST, deletePost)
  yield takeLatest(types.UPDATE_POST, updatePost)
  yield takeLatest(types.REPORT_POST, reportPost)
  yield takeLatest(types.SAVE_POST, savePost)
  yield takeLatest(types.LIKE_POST, likePost)
  yield takeLatest(types.SHARE_POST, sharePost)
  yield takeLatest(types.GET_POST, getPost)
}
