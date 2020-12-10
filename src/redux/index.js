import { applyMiddleware, compose, createStore } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import authMiddleware from './middlewares/auth';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import getReducers from './modules';
import sagas from './modules/sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  //authMiddleware,
  sagaMiddleware
]
const enhancers = [applyMiddleware(...middlewares)]

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
/* eslint-enable */

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const rootReducer = persistCombineReducers({
  key: 'root',
  storage: AsyncStorage,
}, getReducers());

const store = createStore(rootReducer, {}, composeEnhancers(...enhancers))

const persistor = persistStore(store)

sagaMiddleware.run(sagas)

export {
  store,
  persistor
}
