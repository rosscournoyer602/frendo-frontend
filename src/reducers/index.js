import { combineReducers } from 'redux';
import authStatus from './authStatus';
import currentUser from './currentUser';
import userAvatar from './userAvatar';
import friends from './friends';

const rootReducer = combineReducers({
  authStatus,
  currentUser,
  userAvatar,
  friends
});

export default rootReducer;
