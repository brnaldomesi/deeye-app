import {
  AUTH_CHECK_USER,
  AUTH_FORGOT_PASSWORD,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_RESET_PASSWORD,
  AUTH_SIGNUP,
  AUTH_VALIDATE_TOKEN
} from './types';
import {
  authLoginFail,
  authLoginSuccess,
  authLogoutSuccess
} from './actions';
import { put, takeLatest } from 'redux-saga/effects'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCallSaga } from '../api';

const authCheckUser = apiCallSaga({
  type: AUTH_CHECK_USER,
  method: 'post',
  path: '/auth/checkUser',
  selectorKey: 'authCheck',
});

const authSignup = apiCallSaga({
  type: AUTH_SIGNUP,
  method: 'post',
  path: '/auth/signup',
  selectorKey: 'authSignup',
  success: function*(payload) {
    AsyncStorage.setItem('token', payload['auth-token']);
    yield put(authLoginSuccess(payload))
  },
  fail: function*(payload) {
    yield put(authLoginFail(payload))
  }
})

const authLogin = apiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: '/auth/login',
  selectorKey: 'authLogin',
  success: function*(payload) {
    AsyncStorage.setItem('token', payload['auth-token']);
    AsyncStorage.setItem('profile', JSON.stringify(payload.profile));
    yield put(authLoginSuccess(payload));
  },
  fail: function*(payload) {
    yield put(authLoginFail(payload))
  }
})

const handleLogout = function*(payload) {
  AsyncStorage.clear();
  yield put(authLogoutSuccess(payload));
}

const authLogout = apiCallSaga({
  type: AUTH_LOGOUT,
  method: 'post',
  path: '/authentication/logout',
  selectorKey: 'authLogout',
  success: handleLogout,
  fail: handleLogout
})

const authForgotPassword = apiCallSaga({
  type: AUTH_FORGOT_PASSWORD,
  method: 'put',
  path: ({ payload }) => `/authentication/forgotPassword?email=${payload.values.email}`,
  selectorKey: 'forgotPassword'
})

const authValidateToken = apiCallSaga({
  type: AUTH_VALIDATE_TOKEN,
  method: 'get',
  path: ({ payload }) => `/authentication/validateToken?token=${payload.data.token}`,
  selectorKey: 'forgotPassword'
})

const authResetPassword = apiCallSaga({
  type: AUTH_RESET_PASSWORD,
  method: 'put',
  path: `/authentication/resetPassword`,
  selectorKey: 'forgotPassword'
})

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, authLogin)
  yield takeLatest(AUTH_LOGOUT, authLogout)
  yield takeLatest(AUTH_FORGOT_PASSWORD, authForgotPassword)
  yield takeLatest(AUTH_VALIDATE_TOKEN, authValidateToken)
  yield takeLatest(AUTH_RESET_PASSWORD, authResetPassword)
  yield takeLatest(AUTH_CHECK_USER, authCheckUser)
  yield takeLatest(AUTH_SIGNUP, authSignup)
}
