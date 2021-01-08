import * as types from './types'

import { apiCallSaga } from '../api'
import { takeLatest } from 'redux-saga/effects'

const getUserPostsList = apiCallSaga({
  type: types.GET_USER_POSTS_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: ({payload}) => `/profiles/${payload.id}/posts`,
  selectorKey: 'userPostsList'
})

export default function* rootSaga() {
  yield takeLatest(types.GET_USER_POSTS_LIST, getUserPostsList)
}
