import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sandbox.api.lettutor.com',
  headers: {
    'Content-Type': 'application/json',
    Origin: 'https://sandbox.app.lettutor.com',
    Referer: 'https://sandbox.app.lettutor.com/',
  },
});

export default api;
