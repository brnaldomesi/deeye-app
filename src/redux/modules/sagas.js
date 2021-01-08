import { all } from 'redux-saga/effects';
import { saga as auth } from './auth';
import { saga as posts } from './posts';
import { saga as profiles } from './profiles';

export default function* rootSaga() {
  yield all([auth(), posts(), profiles()])
}
