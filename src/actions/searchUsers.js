import { SEARCH_USERS } from './actionTypes';

const searchUsers = searchString => ({
  type: SEARCH_USERS,
  payload: searchString
});

export default searchUsers;
