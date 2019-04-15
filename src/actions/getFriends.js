import { GET_FRIENDS } from './actionTypes';

const getFriends = id => ({
  type: GET_FRIENDS,
  payload: id
});

export default getFriends;
