import { action } from 'typesafe-actions';
import * as typeActions from './typeActions';

export const userRequest = () => action(typeActions.USER_REQUEST);
export const userSuccess = (user) => action(typeActions.USER_SUCCESS, { user });
export const userFail = () => action(typeActions.USER_FAIL);

export const createUserRequest = (user) => action(typeActions.CREATE_USER_REQUEST, { user });
export const createUserSuccess = (user) => action(typeActions.CREATE_USER_SUCCESS, { user });
export const createUserFail = () => action(typeActions.CREATE_USER_FAIL);
