import axios from 'axios';
import { API_HOST } from 'constants.js';

export function getUsersWaiting() {
  return async dispatch  => {
    const response = await axios.get(`${API_HOST}/users/approve`);
    dispatch({
      type: 'ADMIN_GET_USERS_WAITING',
      payload: response.data.result || [],
    })
  }
}

export function getUsers() {
  return async dispatch => {
    const response = await axios.get(`${API_HOST}/users`);
    dispatch({
      type: 'ADMIN_GET_USERS',
      payload: response.data.result || [],
    })
  }
}

export function deleteUser (userId) {
  return async dispatch => {
    await axios.delete(`${API_HOST}/users/${userId}`)
    dispatch(getUsers());
    dispatch(getUsersWaiting());
  }
}

export function checkUser (userId) {
  return async dispatch => {
    await axios.put(`${API_HOST}/users/check/${userId}`);
    dispatch(getUsersWaiting());
  }
}