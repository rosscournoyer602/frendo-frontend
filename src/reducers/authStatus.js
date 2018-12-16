import { AUTH_USER, UNAUTH_USER } from '../actions/actionTypes';

const authStatus = (state = false, action) => {
  switch (action.type) {
    case AUTH_USER:
      return true;
    case UNAUTH_USER:
      return false;
    default:
      return state;
  }
};

export default authStatus;
