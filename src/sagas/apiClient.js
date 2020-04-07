import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://friendo1.herokuapp.com'
});

export default {
  auth: {
    signUpUser: payload => apiClient.post('/signup', payload),
    signInUser: payload => apiClient.post('/signin', payload)
  },
  data: {
    addPerson: (data, config) => apiClient.post('/addperson', data, config),
    getPerson: config => apiClient.get('/person', config),
    updateAvatar: (data, config) => apiClient.put('/avatar', data, config),
    searchUser: config => apiClient.get('/search', config)
  },
  relations: {
    getFriends: config => apiClient.get('/friends', config),
    updateFriends: (data, config) => apiClient.put('/friendupdate', data, config),
    getChat: config => apiClient.get('/getchat', config)
  }
};
