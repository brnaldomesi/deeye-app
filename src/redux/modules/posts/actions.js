import * as types from './types'

import { createAction } from 'redux-actions';

export const getPostsList = createAction(types.GET_POSTS_LIST);
export const createPost = createAction(types.CREATE_POST);
