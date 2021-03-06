/* eslint-disable no-undef */
import { AUTH_USER, UNAUTH_USER } from '../actions/actionTypes';

const authStatus = (state = false, action) => {
  switch (action.type) {
    case AUTH_USER:
      return true;
    case UNAUTH_USER:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    default:
      return state;
  }
};

export default authStatus;
