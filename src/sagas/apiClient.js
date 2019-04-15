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
    addPerson: (data, config) => apiClient.post('/addperson', data, config),
    getPerson: config => apiClient.get('/person', config),
    updateAvatar: (data, config) => apiClient.put('/avatar', data, config)
  },
  relations: {
    getFriends: config => apiClient.get('/friends', config)
  }
};
