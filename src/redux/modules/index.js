import api from './api'
import auth from './auth'
import { combineReducers } from 'redux'
import cometchat from './cometchat';
import comments from './comments'
import posts from './posts'
import profiles from './posts'

export default () =>
  ({
    api,
    auth,
    posts,
    profiles,
    comments,
    cometchat
  })
