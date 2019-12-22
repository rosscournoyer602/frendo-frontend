import { UPDATE_CHATS } from '../actions/actionTypes';

const updateChats = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CHATS:
      return action.payload;
    default:
      return state;
  }
};

export default updateChats;
