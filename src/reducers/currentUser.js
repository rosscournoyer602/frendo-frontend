import { UPDATE_USER } from '../actions/actionTypes';

const currentUser = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    default:
      return state;
  }
};

export default currentUser;
