import * as types from './types'

import { createAction } from 'redux-actions';

export const cometChatLogin = createAction(types.COMET_CHAT_LOGIN);
export const cometChatLoginStart = createAction(types.COMET_CHAT_LOGIN_START);
export const cometChatLoginSuccess = createAction(types.COMET_CHAT_LOGIN_SUCCESS);
export const cometChatLoginFail = createAction(types.COMET_CHAT_LOGIN_FAIL);
