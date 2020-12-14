import { all } from 'redux-saga/effects'
import { saga as auth } from './auth'

export default function* rootSaga() {
  yield all([auth()])
}
