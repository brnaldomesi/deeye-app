import { AUTH_LOGOUT_SUCCESS } from 'src/redux/modules/auth'
import { REQUEST_REJECTED } from 'src/redux/modules/api'
import get from 'lodash/get'

const authMiddleware = store => next => action => {
  if (action.type === REQUEST_REJECTED) {
    const status = get(action, 'payload.data.status')
    if (status === 401) {
      store.dispatch({
        type: AUTH_LOGOUT_SUCCESS
      })
      return
    }
  }

  return next(action)
}

export default authMiddleware
