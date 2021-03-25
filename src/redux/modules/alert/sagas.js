import * as types from './types'

import {
  getAlertListFail,
  getAlertListSuccess,
} from './actions'
import { put, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import {refineJSON} from "src/utils/helpers";

const getAlertList = apiCallSaga({
  type: types.GET_ALERT_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: '/alerts',
  selectorKey: 'alertsList',
  success: function*(payload) {
    yield put(getAlertListSuccess(refineJSON(payload)))
  },
  fail: function*(payload) {
    yield put(getAlertListFail(payload))
  }
});

const setLocation = apiCallSaga({
  type: types.SET_LOCATION,
  method: 'put',
  allowedParamKeys: [],
  path: '/users',
  selectorKey: 'setLocation',
  success: function*(payload) {
    yield put(setLocation(payload))
  },
  fail: function*(payload) {
    console.log('err')
  }
});

export default function* rootSaga() {
  yield takeLatest(types.GET_ALERT_LIST, getAlertList);
  yield takeLatest(types.SET_LOCATION, setLocation);
}
