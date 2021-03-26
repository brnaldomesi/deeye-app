import * as types from './types'

import {
  getFollowListFail,
  getFollowListSuccess,
} from './actions'
import { put, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { refineJSON } from "src/utils/helpers";

const getFollowList = apiCallSaga({
  type: types.GET_FOLLOW_LIST,
  method: 'get',
  // allowedParamKeys: ['type', 'search'],
  path: '/followers',
  selectorKey: 'followList',
  success: function*(payload) {
    yield put(getFollowListSuccess(refineJSON(payload)))
  },
  fail: function*(payload) {
    yield put(getFollowListFail(payload))
  }
});

const setFollow = apiCallSaga({
  type: types.SET_FOLLOW,
  method: 'post',
  allowedParamKeys: [],
  path: '/follow',
  selectorKey: 'setFollow',
  success: function*(payload) {
    console.log('payload', payload)
  },
  fail: function*(payload) {
    console.log('payload error', payload)
  }
});

export default function* rootSaga() {
  yield takeLatest(types.GET_FOLLOW_LIST, getFollowList);
  yield takeLatest(types.SET_FOLLOW, setFollow);
}
