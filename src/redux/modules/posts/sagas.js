import * as types from './types'

import { apiCallSaga } from '../api'
import { takeLatest } from 'redux-saga/effects'

const getPostsList = apiCallSaga({
  type: types.GET_POSTS_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: '/posts',
  selectorKey: 'postsList',
})

const createPost = apiCallSaga({
  type: types.CREATE_POST,
  method: 'post',
  allowedParamKeys: [],
  path: '/posts/create',
  selectorKey: 'post',
})

export default function* rootSaga() {
  yield takeLatest(types.GET_POSTS_LIST, getPostsList)
  yield takeLatest(types.CREATE_POST, createPost)
}
