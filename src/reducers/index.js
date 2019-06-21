import { combineReducers } from 'redux';
import authStatus from './authStatus';
import currentUser from './currentUser';
import userAvatar from './userAvatar';
import friends from './friends';
import searchResults from './searchResults';

const rootReducer = combineReducers({
  authStatus,
  currentUser,
  userAvatar,
  friends,
  searchResults
});

export default rootReducer;
