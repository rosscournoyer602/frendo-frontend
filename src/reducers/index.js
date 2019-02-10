import { combineReducers } from 'redux';
import authStatus from './authStatus';
import currentUser from './currentUser';
import userAvatar from './userAvatar';

const rootReducer = combineReducers({
  authStatus,
  currentUser,
  userAvatar
});

export default rootReducer;
