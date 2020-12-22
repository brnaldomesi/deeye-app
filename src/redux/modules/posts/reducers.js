import * as types from './types'

import concat from 'lodash/concat'
import { handleActions } from 'redux-actions'

const getInitialState = () => ({
  postsList: [],
})

export default handleActions(
  {},
  getInitialState()
)
