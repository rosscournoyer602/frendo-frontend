import { CHANGE_UPDATE_STATUS } from './actionTypes';

const changeUpdateStatus = payload => ({
  type: CHANGE_UPDATE_STATUS,
  payload
});

export default changeUpdateStatus;
