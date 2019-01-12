import { ADD_PERSON } from './actionTypes';

const addPerson = payload => ({
  type: ADD_PERSON,
  payload
});

export default addPerson;
