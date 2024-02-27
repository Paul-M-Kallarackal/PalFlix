// userActions.js
import { SET_USER_DETAILS } from './userActionTypes';

export const setUserDetails = (user) => ({
  type: SET_USER_DETAILS,
  payload: user,
});