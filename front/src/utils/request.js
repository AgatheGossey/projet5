import axios from 'axios';
import { API_HOST } from 'constants.js';

/**
 * New axios instance to customize parameters
 */
const request = axios.create({
  baseURL: API_HOST,
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}` || null,
  },
});

/**
 * Request interceptor to update token on each request
 */
request.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
    if (token) {
      config.headers['authorization'] = `Bearer ${ token }`;
    }
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

export default request;