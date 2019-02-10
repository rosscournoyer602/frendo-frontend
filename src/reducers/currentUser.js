/* eslint-disable no-undef */
import { UPDATE_USER } from '../actions/actionTypes';

const currentUser = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    default:
      return localStorage.getItem('user') || state;
  }
};

export default currentUser;
