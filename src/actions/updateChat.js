import { UPDATE_MESSAGES } from './actionTypes';

export default payload => {
  console.log('UPDATEMESSAGES')
  return {
    type: UPDATE_MESSAGES,
    payload
  };
}
