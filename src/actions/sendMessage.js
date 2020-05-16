import { SEND_MESSAGE } from './actionTypes';

const sendMessage = messages => ({
  type: SEND_MESSAGE,
  payload: messages
});

export default sendMessage;
