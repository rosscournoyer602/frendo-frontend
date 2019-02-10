/* eslint-disable no-undef */
import { UPDATE_AVATAR } from '../actions/actionTypes';

const userAvatar = (state = '', action) => {
  switch (action.type) {
    case UPDATE_AVATAR:
      return action.payload;
    default:
      return state;
  }
};

export default userAvatar;
