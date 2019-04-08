import { GET_PERSON } from './actionTypes';

const getPerson = email => ({
  type: GET_PERSON,
  payload: email
});

export default getPerson;
