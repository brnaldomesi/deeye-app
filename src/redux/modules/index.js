import api from './api'
import auth from './auth'
import { combineReducers } from 'redux'
import posts from './posts'

export default () =>
  ({
    api,
    auth,
    posts
  })
