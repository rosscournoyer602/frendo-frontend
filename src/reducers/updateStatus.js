/* eslint-disable no-undef */
import { CHANGE_UPDATE_STATUS } from '../actions/actionTypes';

const updateStatus = (state = '', action) => {
  switch (action.type) {
    case CHANGE_UPDATE_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default updateStatus;
