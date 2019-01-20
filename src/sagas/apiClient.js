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
    addPerson: (headers, payload) => apiClient.post('/addperson', { headers }, payload),
    getPerson: (headers, params) => apiClient.get('/person', { headers, params })
  }
};
