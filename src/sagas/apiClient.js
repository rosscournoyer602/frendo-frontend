import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8080'
});

export default {
  auth: {
    signUpUser: payload => apiClient.post('/signup', payload),
    signInUser: payload => apiClient.post('/signin', payload)
  },
  data: {
    addPerson: (payload, token) => apiClient.post('/addperson', payload, token)
  }
};
