import { call, put, select } from 'redux-saga/effects'
import { requestPending, requestRejected, requestSuccess } from './actions'

import { BASE_URL } from 'src/config/apipath'
import axios from 'axios'
import get from 'lodash/get'
import pick from 'lodash/pick'
import { tokenSelector } from 'src/redux/modules/auth/selectors'
import Loading from 'src/utils/Loading'
import {refineJSON} from "../../../utils/helpers";

const defaultHeaders = token => ({
  'Content-Type': 'application/json;charset=utf-8',
  Accept: 'application/json, text/plain, */*',
  ...(token
    ? {
        'Authorization': 'Bearer ' + token
      }
    : {})
})

export default ({
  type,
  method, // one of 'get', 'post', 'put', 'delete'
  path,
  allowedParamKeys,
  defaultParams,
  headers,
  stealthy,
  success, // Can be function generator to use yield
  fail, // Can be function generator to use yield
  payloadOnSuccess,
  payloadOnFail,
  requestSelectorKey,
  selectorKey
}) =>
  function*(action) {
    const payload = action.payload || {}
    const {
      data,
      params,
      headers: customHeaders,
      success: successCallback,
      fail: failCallback,
      cancelToken,
      onUploadProgress,
      onDownloadProgress,
      resolve,
      reject
    } = payload
    console.log("data", data);
    try {

      if (!stealthy) {
        Loading.show()
        yield put(requestPending({ selectorKey, requestSelectorKey, method }))
      }

      const queryParams = { ...defaultParams, ...params }

      const token = yield select(tokenSelector)

      console.log(token)

      const res = yield call(axios.request, {
        url: typeof path === 'function' ? path(action) : path,
        method: method.toLowerCase(),
        withCredentials: true,
        headers: {
          ...defaultHeaders(token),
          ...headers,
          ...(customHeaders ? customHeaders : {})
        },
        data,
        params: allowedParamKeys ? pick(queryParams, allowedParamKeys) : queryParams,
        baseURL: `${BASE_URL}`,
        cancelToken,
        onUploadProgress,
        onDownloadProgress
      })

      const payload = payloadOnSuccess ? payloadOnSuccess(refineJSON(refineJSON(res).data), action) : refineJSON(refineJSON(res).data)
      yield put(
        requestSuccess({
          selectorKey,
          requestSelectorKey,
          method,
          data: payload
        })
      )

      if (resolve) {
        // Promise parameter
        yield resolve(payload)
      }

      if (success) {
        yield success(payload, action)
      }
      successCallback && successCallback(payload)

      Loading.hide();
      return true
    } catch (err) {
      Loading.hide();
      // console.error(err)
      const errRes = get(err, 'response', err)
      const payload = payloadOnFail ? payloadOnFail(errRes, action) : errRes
      if (!stealthy) {
        yield put(
          requestRejected({
            selectorKey,
            requestSelectorKey,
            method,
            data: payload
          })
        )
      }

      if (reject) {
        // Promise parameter
        yield reject(payload)
      }

      if (fail) {
        yield fail(errRes)
      }

      failCallback && failCallback(errRes)

      return false
    }
  }
