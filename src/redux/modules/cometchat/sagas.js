import * as types from './types';

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  cometChatLoginFail,
  cometChatLoginStart,
  cometChatLoginSuccess
} from './actions';

import { CometChat } from '@cometchat-pro/react-native-chat';

const login = (uid, authKey) => () => {
  return new Promise((resolve, reject) => {
    CometChat.login(uid, authKey)
      .then(resolve)
      .catch(reject);
  });
};

const cometChatLogin = function*(action) {
  yield put(cometChatLoginStart());
  const { payload } = action;
  const res = yield call(login(payload.uid, payload.authKey));
  console.log('!!!!!!!!!!!!!!!', res)
  if(res) {
    yield put(cometChatLoginSuccess(res));
  } else {
    yield put(cometChatLoginFail(res));
  }
}

export default function* rootSaga() {
  yield takeLatest(types.COMET_CHAT_LOGIN, cometChatLogin)
};
