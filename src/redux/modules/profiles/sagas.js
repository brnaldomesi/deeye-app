import * as types from './types'

import { apiCallSaga } from '../api'
import { takeLatest } from 'redux-saga/effects'
import {deletePostSuccess} from '../posts';

const getUserPostsList = apiCallSaga({
  type: types.GET_USER_POSTS_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: ({payload}) => `/profiles/${payload.id}/posts`,
  selectorKey: 'userPostsList'
})

const getUserInfoCounter = apiCallSaga({
  type: types.GET_USER_INFO_COUNTER,
  method: 'get',
  allowedParamKeys: [],
  path: ({payload}) => `/profiles/${payload.id}`,
  selectorKey: 'userInfoCounter'
})

const setUserInfoUpdate = apiCallSaga({
  type: types.SET_USER_INFO_UPDATE,
  method: 'post',
  allowedParamKeys: [],
  path: ({payload}) => `/profiles/${payload.id}`,
  selectorKey: 'userInfoUpdate'
})

const setUserSupport = apiCallSaga({
  type: types.SET_USER_SUPPORT,
  method: 'post',
  allowedParamKeys: ["detail"],
  path: ({payload}) => `/support/${payload.id}`,
  selectorKey: 'userSupport'
})

const setUserNotification = apiCallSaga({
  type: types.SET_USER_NOTIFICATION,
  method: 'put',
  allowedParamKeys: ["proximityAlert", 'normalAlert', 'foundAlert'],
  path: ({payload}) => `/profiles`,
  selectorKey: 'userNotification'
})

export default function* rootSaga() {
  yield takeLatest(types.GET_USER_POSTS_LIST, getUserPostsList);
  yield takeLatest(types.GET_USER_INFO_COUNTER, getUserInfoCounter);
  yield takeLatest(types.SET_USER_NOTIFICATION, setUserNotification);
  yield takeLatest(types.SET_USER_SUPPORT, setUserSupport);
  yield takeLatest(types.SET_USER_INFO_UPDATE, setUserInfoUpdate)
}
