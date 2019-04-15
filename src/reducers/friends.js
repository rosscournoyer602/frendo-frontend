/* eslint-disable no-undef */
import { UPDATE_FRIENDS } from '../actions/actionTypes';

const friends = (state = [], action) => {
  switch (action.type) {
    case UPDATE_FRIENDS:
      return action.payload;
    default:
      return state;
  }
};

export default friends;
