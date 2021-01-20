import { UPDATE_MESSAGES } from '../actions/actionTypes';

const updateChats = (state = '', action) => {
  switch (action.type) {
    case UPDATE_MESSAGES:
      return action.payload;
    default:
      return state;
  }
};

export default updateChats;
