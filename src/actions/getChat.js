import { GET_CHAT } from './actionTypes';

const getChat = id => ({
  type: GET_CHAT,
  payload: id
});

export default getChat;
