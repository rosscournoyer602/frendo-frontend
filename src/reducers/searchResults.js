import { UPDATE_SEARCH } from '../actions/actionTypes';

const searchResults = (state = [], action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default searchResults;
