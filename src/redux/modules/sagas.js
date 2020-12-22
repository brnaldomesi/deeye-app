import { all } from 'redux-saga/effects';
import { saga as auth } from './auth';
import { saga as posts } from './posts';

export default function* rootSaga() {
  yield all([auth(), posts()])
}
