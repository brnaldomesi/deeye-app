import api from './api'
import auth from './auth'
import { combineReducers } from 'redux'

export default () =>
  ({
    api,
    auth
  })
